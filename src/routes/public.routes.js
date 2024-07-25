
const PublicController = require('../features/public/public.controller');
const middleware = require('../../src/features/public/public.middleware')

const registerPublicRoutes = (app) => {
  app.post('/contactus', middleware.contactUs, PublicController.contactUs);

  app.get('/calc/:building_type',  PublicController.getElevatorEstimate);

}

module.exports = {registerPublicRoutes};


