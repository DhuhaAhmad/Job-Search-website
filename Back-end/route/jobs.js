// Require necessary NPM packages
const express = require('express');
const {Job, Company} = require('../model/schemas')
const JobDatabase = require('../model/JobDatabase')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//insert to database
// Job.insertMany(JobDatabase, (err, jobs) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('added provided job data', jobs);
//       mongoose.connection.close();
//     });


 //get all jobs
router.get('/jobs', (req, res) => {
  //if isSort true return all jobs sorted by date
  req.query.isSort?
    Job.find({}).sort({date: 'descending'})
    // Return all
    .then((allJobs) => {
      res.status(200).json({ jobs: allJobs });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
    : Job.find({})
      // Return all
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

  // get company logo for one job
  router.get('/company-logo', (req, res) => {
    Company.find({name:req.query.company })
      // Return all 
      .then((company) => {
        res.status(200).json({logo :company });
      })
    // Catch any errors that might occur
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      });

  //get jobs by location
router.get('/jobs-by-location', (req, res) => {
  const jobLocation = req.query.location
  req.query.isSort?
    Job.find({location: new RegExp(jobLocation,'i')}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Job.find({location: new RegExp(jobLocation,'i')})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      })
  });

  //get jobs by job title
  router.get('/jobs-by-job-title', (req, res) => {
    const jobTitle = req.query.title
    req.query.isSort?
    Job.find({title: new RegExp(jobTitle,'i')}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Job.find({title: new RegExp(jobTitle, 'i')})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      })
  });

  //get all jobs for specific company
router.get('/jobs-by-company', (req, res) => {
  const comapyName = req.query.company
  req.query.isSort?
    Job.find({company: new RegExp(comapyName,'i')}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Job.find({company:  new RegExp(comapyName,'i')})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) 
  });

  //Add new job
router.post('/add-job', (req, res) => {

    Job.create(req.body)
    // Return all 
    .then((newJob) => {
      Company.updateOne({name:req.body.company}, {$push: { jobs: newJob }})
      .then((job)=>{
        res.status(200).json('done');
      })
      .catch((error)=>{
        res.status(500).json({ error: error });
      })
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  })
   

  //Update job by id
router.put('/update-job/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id,req.body)
      // Return all
      .then((Job) => {
        res.status(200).json({ updatedJob :Job });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
//delete job by Id
router.delete('/delete-job/:id', (req, res) => {
    Job.findByIdAndDelete(req.params.id)
      // Return all 
      .then((Job) => {
        res.status(200).json({ deletedJob :Job });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

  //doesn't include in project
// router.delete('/delete-all-jobs', (req, res) => {
//     Job.remove()
//       // Return all 
//       .then((Job) => {
//         res.status(200).json({ deletedJob :Job });
//       })
//       // Catch any errors that might occur
//       .catch((error) => {
//         res.status(500).json({ error: error });
//       });
//   });

// Export the Router so we can use it in the server.js file
module.exports = router;
