const router = require('express').Router()
const Value = require("./values-model.js")
const User = require("../users/users-model.js")
const { validateValueId, validateValueInfo } = require("../middleware/value-middleware.js")

router.post('/', validateValueInfo, (req, res, next) => {
    Value.add(req.body)
        .then(value => {
            res.status(201).json(value)
        })
        .catch(error => {
            res.status(500).json({ message: error.message})
        })
})

router.get('/', (req, res) => {
    Value.get(req.query)
    .then(values => {
        res.status(200).json(values)
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    })
})

router.get('/:id', validateValueId, (req, res) => {
  const { id } = req.params
  Value.findById(id)
  .then(value => {
    res.status(200).json(value)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
})

router.put('/:id', validateValueId, (req, res) => {
  const changes = req.body
  const { id } = req.params
  Value.update(id, changes)
  .then(value => {
    if(value){
      res.status(200).json(value)
    } else {
      res.status(404).json({ message: 'The value could not be found' })
    }
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
})

router.delete('/:id', validateValueId, (req, res) => {
  const { id } = req.params
  Value.remove(id)
  .then(() => {
    res.status(200).json({ message: 'Value has been deleted' })
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
})

module.exports = router;
