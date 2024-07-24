const AgentController = require('../features/agent/agent.controller');
const TopAgentController = require('../features/agent/topagent.controller');

const registerAgentRoutes = (app) => {
  app.post('/agent-create', AgentController.createAgent);

  app.get('/agents', AgentController.getAllAgents);

  app.get('/agents-by-region', AgentController.getAgentsByRegion);

  app.post('/agent-update-info/:id', AgentController.updateAgentInfo);

  app.post('/agent-delete/:id', AgentController.deleteAgent);
  
  app.get('/topagents', TopAgentController.getTopAgents);
}

module.exports = {registerAgentRoutes};