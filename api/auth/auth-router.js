const router = require('express').Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const secret = require("../secret/index.js");
const Users = require("../users/users-model.js")
const { checkPayload, uniqueUsername} = require('../middleware/auth-middleware.js');

router.post('/register', checkPayload, uniqueUsername, (req, res, next) => {
  const { username, password } = req.body

  const hash = bcrypt.hashSync(password, 8);
  Users.add({ username, password: hash })
    .then(newUser => {
      res.status(200).json(newUser)
    })
   .catch(next)
  
});

router.post('/login', checkPayload, (req, res, next) => {
  const { username, password } = req.body

  Users.findByUsername(username)
    .then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        "message": `hello ${username}`,
        "token": token
      })
      } else {
      res.status(401).json('invalid credentials')
      }
    })
    .catch(next)
});

function makeToken(user){
  const payload = {
    subject: user.id,
    username: user.username,

  }

  const options = {
    expiresIn: '1d',
  }
 return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
