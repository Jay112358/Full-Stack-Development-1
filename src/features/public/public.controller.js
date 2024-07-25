const Data = require('../../shared/resources/data');
const schema = require('../../shared/db/mongodb/schemas/contactUs.Schema')

const contactUs = (req,res) => {
  try{
  const fullName = req.body.fullname;

  schema.create(req.body)

  const responseMessage = `Message received from ${fullName}`;

  console.log(req.body);
  res.send(responseMessage);
}
catch(error){
  res.send(error)
}
};

const calculateResidentialQuote = (req,res) => {
  // define constants
  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const tier = req.query.tier.toLowerCase();

  // validate request object
  if(!Object.keys(Data.unitPrices).includes(tier)){
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  }
  
  if(isNaN(floors) || isNaN(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be specified as numbers`);
    return;
  }

  if(!Number.isInteger(floors) || !Number.isInteger(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be integers`);
    return;
  }

  if(floors < 1 || apts < 1){
    res.status(400);
    res.send(`apts and floors must be greater than zero`);
    return;
  }

  // business logic
  const numElevators = calcResidentialElev(floors,apts);
  const totalCost = calcInstallFee(numElevators,tier);

  // format response
  res.send({
    elevators_required:numElevators,
    cost: totalCost
  });
};

const calcResidentialElev = (numFloors, numApts) => {
  return Math.ceil(numApts / numFloors / 6) * Math.ceil(numFloors / 20);
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200) * Math.ceil(numFloors / 10);
  const freightElevatorsRequired = Math.ceil(numFloors / 10);
  return freightElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (totalPrice, installPercentFee) => {
  return (installPercentFee / 100) * totalPrice;
};

const getPricing = (productLine, numElv) => {
  const unitPrices = {
      standard: 8000,
      premium: 12000,
      excelium: 15000,
  };
  const installPercentFees = {
      standard: 10,
      premium: 15,
      excelium: 20,
  };

  let unitPrice = unitPrices[productLine];
  let installPercentFee = installPercentFees[productLine];
  let subtotal = unitPrice * numElv;
  let totalInstallFee = calcInstallFee(subtotal, installPercentFee);
  let totalPrice = subtotal + totalInstallFee;

  return {
      unitPrice,
      subtotal,
      totalInstallFee,
      totalPrice
  };
};

const getElevatorEstimate = (req, res) => {
  
  const { numFloors, numApts, maxOccupancy, numElevators, productLine } = req.query
  const building_type = req.params.building_type

  let calculatedElv;
  if (building_type == "commercial") {
      calculatedElv = calcCommercialElev(parseInt(numFloors), parseInt(maxOccupancy));
  } else if (building_type == "residential") {
      calculatedElv = calcResidentialElev(parseInt(numFloors), parseInt(numApts));
  } else if (building_type == "industrial") {
      calculatedElv = parseInt(numElevators);
  } else {
      return res.status(400).json({ error: "Invalid building type" });
  }

  const pricing = getPricing(productLine, calculatedElv);

  res.json({
      elevatorsRequired: calculatedElv,
      unitPrice: pricing.unitPrice,
      subtotal: pricing.subtotal,
      totalInstallFee: pricing.totalInstallFee,
      totalPrice: pricing.totalPrice
  });
};

module.exports = {
  getElevatorEstimate,
  contactUs
};