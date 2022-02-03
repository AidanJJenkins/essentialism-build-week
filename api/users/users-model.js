const db = require("../../data/dbConfig.js");

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
  findByUsername,
  updateDescription,
};

function findAll() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

async function update(id, changes) {
  await db("users").where({ id }).update(changes);
  return getById(id);
}

function remove(id) {
  return db("users").where({ id }).del();
}

function findByUsername(username) {
  return db('users')
    .where('username', username)
}

function updateDescription(changes, id) {
  return db("users")
    .where({ id: id })
    .update(changes)
}
