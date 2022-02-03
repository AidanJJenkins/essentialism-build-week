const Users = require("../users/users-model.js")

const checkPayload = (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(404).json({message: 'Username and password is required'})
    } else {
        req.username = username
        req.password = password
        next()
      }
    } catch (err) {
        next(err)
    }
  }

const uniqueUsername = async (req, res, next) => {
  try {
    const existingUsername = await Users.findByUsername(req.body.username)
    if (!existingUsername.length) {
      next()
    } else {
      res.status(404).json({message: 'Username is already taken'})
      }
  } catch (err) {
     next(err)
  }
}

module.exports = {
  checkPayload,
  uniqueUsername,
}
