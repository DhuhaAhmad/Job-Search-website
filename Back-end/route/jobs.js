// Require necessary NPM packages
const express = require('express');
const Jobs = require('../model/schemas')
const JobDatabase = require('../model/JobDatabase')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//insert to database
// Jobs.Job.insertMany(JobDatabase, (err, jobs) => {
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
    Jobs.Job.find({}).sort({date: 'descending'})
    // Return all
    .then((allJobs) => {
      res.status(200).json({ jobs: allJobs });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
    : Jobs.Job.find({})
      // Return all
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

  //get jobs by location
router.get('/jobs-by-location', (req, res) => {
  req.query.isSort?
    Jobs.Job.find({location: req.query.location}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Jobs.Job.find({location: req.query.location})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      })
  });

  //get jobs by job title ****need fix
  router.get('/jobs-by-job-title', (req, res) => {
    const jobTitle = req.query.title.toLowerCase()
    req.query.isSort?
    Jobs.Job.find({title: jobTitle}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Jobs.Job.find({title: jobTitle})
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
  req.query.isSort?
    Jobs.Job.find({company: req.query.company}).sort({date: 'descending'})
      // Return all 
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      }) : Jobs.Job.find({company: req.query.company})
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
    Jobs.Job.create(req.body)
      // Return all 
      .then((newJob) => {
        res.status(200).json({ theNewJob :newJob });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });


  //Update job by id
router.put('/update-job/:id', (req, res) => {
    Jobs.Job.findByIdAndUpdate(req.params.id,req.body)
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
    Jobs.Job.findByIdAndDelete(req.params.id)
      // Return all 
      .then((Job) => {
        res.status(200).json({ deletedJob :Job });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

  //doesn't included in project
// router.delete('/delete-all', (req, res) => {
//     Jobs.Job.remove()
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
