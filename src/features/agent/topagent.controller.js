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
const getTopAgents = asyncWrapper(async (req, res) => {
    try {
        // Get the 'region' query parameter from the request
        const { region } = req.query;

        // Build the filter object
        let filter = {};
        if (region) {
            filter.region = region;
            
        }

        // Find agents with the specified filter
        const agents = await Agent.find(filter);

        // Respond with the filtered agents
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = {
    getTopAgents,
    getTopRegion
  };