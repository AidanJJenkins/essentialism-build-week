const Value = require("../values/values-model.js")

async function validateValueId(req, res, next) {
  try {
    const { id } = req.params
    const value = await Value.findById(id)
    if(!value){
      res.status(404).json("Value not found")
    } else {
      req.value = value
      next()
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

function validateValueInfo(req, res, next) {
  if(!req.body.value || !req.body.value_definition){
    res.status(400).json("missing required text field")
  } else {
    next()
  }
}

module.exports = {
  validateValueId,
  validateValueInfo
}
