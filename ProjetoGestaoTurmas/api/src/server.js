require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`API iniciada: http://localhost:${PORT}`);
});
