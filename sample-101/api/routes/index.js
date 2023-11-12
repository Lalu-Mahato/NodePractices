/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const userApis = require('./user');
const authApis = require('./auth');
const roleApis = require('./role');

router.use('/users', userApis);
router.use('/auth', authApis);
router.use('/roles', roleApis);

router.get('/test', (req, res) => res.send({ message: 'Hello World' }));

module.exports = router;
