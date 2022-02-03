const db = require("../../data/dbConfig.js")

module.exports = {
    insert,
    find,
    markImportant,
}

function insert(favorite) {
    return db('favorites')
        .insert(favorite)
        .then(rows => {
            return find(favorite.value_id, favorite.user_id)
        })
}

function find(value_id, user_id) {
    return db("favorites")
        .where({ value_id: value_id, user_id: user_id  })
        .first()
}

function markImportant(value_id, user_id) {
    return db('favorites')
        .where({ value_id: value_id, user_id: user_id  })
        .update({ important: 1 })
        .then(rows => {
            return find(value_id, user_id)
        })
}
