require('module-alias/register');
const http = require('http');
const express = require('express');
const logger = require('@logger');

const app = express();
const port = parseInt(process.env.PORT || 3000, 10);

const server = http.createServer(app);
server.listen(port, () => logger.info(`Server listening on port:${port}`));
