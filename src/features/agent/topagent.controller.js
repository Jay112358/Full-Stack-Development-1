const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Agent = require("../../shared/db/mongodb/schemas/agent.Schema");
const asyncWrapper = require('../../shared/util/base-utils');


const getTopRegion = asyncWrapper( async (req,res) => {
    const region = req.query.region
         if (region = 'north'){console.log('valid region')}
    else if (region = 'south'){console.log('valid region')}
    else if (region = 'east'){console.log('valid region')}
    else if (region = 'west'){console.log('valid region')}
    else res.status(400).send
})
const getTopAgents = asyncWrapper( async (req,res) => {
    try {
        const agents = await Agent.find();
        //const filteredagents = agents.filter(agent => agent.rating >= 95);
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = {
    getTopAgents,
    getTopRegion
  };