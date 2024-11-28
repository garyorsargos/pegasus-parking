const mongoose = require('mongoose');
const Garages = require('../models/garage');
const permits = require('../models/permit');

const checkPermits = async (req, res) => {
   try {
      const { curPermit } = req.body;
      
      if (!curPermit) {
         return res.status(400).json({ error: "No permits." });
      }
      // sets have quick lookup instead of a regular array
      const curPermitSet = new Set(curPermit.permit);
      
      // get all garages
      const garages = await Garages.find({});
      const results = [];

      // loops through each garages permit and checks for it in the set of permits given
      for (const garage of garages) {
         for (const permit of garage.permit) {
            // add and move onto next garage
            if (curPermitSet.has(permit)) {
               results.push(garage);
               break;
            }
         }
      }

      return res.json(results);
   }
   catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred with the permits." });
   }
};

module.exports = checkPermits;