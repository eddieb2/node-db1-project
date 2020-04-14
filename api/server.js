const express = require('express');

// Router
const AccountsRouter = require('./routes/route');

const server = express();

server.use(express.json());

// Use Router
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
  res.send(`TESTING`);
});

module.exports = server;
