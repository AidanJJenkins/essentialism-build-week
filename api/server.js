const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const valuesRouter = require('./values/values-router.js');
const favoritesRouter = require('./favorites/favorites-router.js')
const usersRouter = require('./users/users-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/values', restricted, valuesRouter);
server.use('/api/favorites', restricted, favoritesRouter);
server.use('/api/users', restricted, usersRouter)

module.exports = server;
