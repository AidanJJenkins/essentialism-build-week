const router = require('express').Router()
const Favorite = require("./favorites-model.js")
const { validateValueId, validateValueInfo } = require("../middleware/value-middleware.js")

router.post('/', (req, res, next) => {
    Favorite.insert(req.body)
        .then(favorite => {
            res.status(201).json(favorite)
        })
        .catch(error => {
            res.status(500).json({ message: error.message})
        })
})

router.put('/:id/important', validateValueId, (req, res) => {
  const { id } = req.params
  const token = req.decodedToken
  Favorite.markImportant(id, token.subject)
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

module.exports = router;
