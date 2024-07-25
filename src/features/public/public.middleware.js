const validator = require('validator');



const { isMobilePhone } = require("validator");

const contactUs = (req,res, next) => {
    const {phone, email} = req.body;
    const emailvalid = validator.isEmail(email)
    const phonevalid = validator.isMobilePhone(phone)
    console.log(emailvalid)
    if(
      emailvalid==true&&
      phonevalid==true
    )
    {next()}
    else{
      res.send('Email or Phone incorrect')
    }
    
  
  };
  const regionvalid = (req, res, next) => {
    let { region } = req.query;

    // Validate that region is one of the allowed values
    const validRegions = ['north', 'south', 'east', 'west', ''];
    const isValid = validRegions.includes(region);

    console.log(isValid);
    if (isValid) {
        next();
    } else {
        res.send('Region incorrect');
    }
};

  module.exports = {
contactUs,
regionvalid
  }

  