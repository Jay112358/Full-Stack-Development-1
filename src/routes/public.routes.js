const PublicController = require('../features/public/public.controller');

const registerPublicRoutes = (app) => {
  app.post('/contactus', PublicController.contactUs);

  app.get('/calc', PublicController.getElevatorEstimate);

}

module.exports = {registerPublicRoutes};