/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsers, getUsersByEmail }  = require('../lib/users-queries');

// Router middlewares with no mount path (will be executed on every request to the router)



// GET /users/

router.get('/', (req, res, next) => {
  getUsers()
    .then((users) => {
      return res.users;
    })
    .catch((err) => {
      return err.messages;
    })
})

router.get('/:email', (req, res, next) => {
  if (req.params.email) {
    getUsersByEmail(email)
      .then((email) => {
        return res.email;
      })
  }
})

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
