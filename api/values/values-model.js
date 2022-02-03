const db = require("../../data/dbConfig.js")

module.exports = {
  add,
  findById,
  get,
  update,
  remove,
};

function add(value) {
  return db('values')
    .insert(value)
    .then(value_id => {
      return findById(value_id[0]);
    });
}

function findById(value_id) {
  return db("values")
    .where({ value_id })
    .first();
}

function get() {
  return db('values');
}

function update(value_id, changes) {
  return db('values')
    .where({ value_id })
    .update(changes)
    .then(rows => {
      return findById(value_id);
    });
}

function remove(id) {
  return db('values')
    .where('value_id', id)
    .del();
}
