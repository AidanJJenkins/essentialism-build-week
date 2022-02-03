const router = require('express').Router()
const User = require("../users/users-model.js")

router.put('/description', (req, res) => {
  const changes = req.body
  const userId = req.decodedToken.subject
  User.updateDescription(changes, userId)
  .then(() => {
      res.status(200).json(changes)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
})

module.exports = router;
