// Require necessary NPM packages
const express = require('express');
const {Job, Company} = require('../model/schemas')
const CompanyDatabase = require('../model/CompanyDatabase')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//insert to database
// Company.insertMany(CompanyDatabase, (err,comp)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('added provided Company data', comp);
//     mongoose.connection.close();
// })

 //get all 
router.get('/companies', (req, res) => {
    Company.find({})
      // Return all
      .then((allCompanies) => {
        res.status(200).json({ companies: allCompanies });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
  
router.put('/companies-jobs', (req, res) => {
    Company.updateOne({name:req.query.company}, {$push: { jobs: req.body}})
      // Return all
      .then((company) => {
        res.status(200).json({ company: company });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

// router.delete('/delete-all-companies', (req, res) => {
//     Company.remove({})
//       // Return all
//       .then((allCompanies) => {
//         res.status(200).json({ companies: allCompanies });
//       })
//       // Catch any errors that might occur
//       .catch((error) => {
//         res.status(500).json({ error: error });
//       });
//   });

// Export the Router so we can use it in the server.js file
module.exports = router;
