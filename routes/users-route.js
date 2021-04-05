/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsers, getUsersById, getUsersByEmail }  = require('../lib/users-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.user has been called');
  next();
})



module.exports = (database) => {
  // GET /users/
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        return err.messages;
      })
  })

  router.get('/:id', (req, res) => {
    getUsersById(id)
      .then((users) => {
        res.send(users);
      })
  })

  router.get('/:email', (req, res) => {
    if (req.params.email) {
      getUsersByEmail(email)
        .then((email) => {
          res.send(email);
        })
    }
  });

  return router;
}

// module.exports = (database) => { router };

// const userRouter = (db) = {
//   // GET /users/
//   router.get('/', (req, res) => {
//     userDb.getUsers()
//       .then((res) => {
//          res.rows)
//       .catch()
//   })



// };

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
