/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const express = require('express');
const logger = require('../config/logger');

const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes');
const connectDB = require('./config/database');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRoutes);

const server = http.createServer(app);
server.listen(port, () => logger.info(`Server listening on port:${port}`));
