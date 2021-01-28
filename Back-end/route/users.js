// Require necessary NPM packages
const express = require('express');
const Users = require('../model/schemas')
const UsersDatabase = require('../model/UsersDatabase')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//insert to database
// Users.User.insertMany(UsersDatabase, (err, users) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('added provided user data', users);
//       mongoose.connection.close();
//     });


 //get all =
router.get('/users', (req, res) => {
  Users.User.find({})
      // Return all
      .then((allJobs) => {
        res.status(200).json({ jobs: allJobs });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

// Export the Router so we can use it in the server.js file
module.exports = router;