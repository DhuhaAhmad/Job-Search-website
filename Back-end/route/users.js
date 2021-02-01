// Require necessary NPM packages
const express = require('express');
const {Job, Company, User} = require('../model/schemas')
const UsersDatabase = require('../model/UserDatabase')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

//insert to database
// User.insertMany(UsersDatabase, (err, users) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('added provided user data', users);
//       mongoose.connection.close();
//     });


 //get all 
// router.get('/users', (req, res) => {
//   User.find({})
//       // Return all
//       .then((allUsers) => {
//         res.status(200).json({ Users: allUsers });
//       })
//       // Catch any errors that might occur
//       .catch((error) => {
//         res.status(500).json({ error: error });
//       });
//   });

router.get('/log-in', (req, res) => {
    const email = req.query.email
    const password = req.query.password
  User.find({$and:[{email: email},{password: password}]})
      // Return all
      .then((user) => {
        res.status(200).json({ user: user });
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

// router.delete('/delete-all-users', (req, res) => {
    
//   User.remove()
//       // Return all
//       .then((user) => {
//         res.status(200).json({ user: user });
//       })
//       // Catch any errors that might occur
//       .catch((error) => {
//         res.status(500).json({ error: error });
//       });
//   });



// Export the Router so we can use it in the server.js file
module.exports = router;
