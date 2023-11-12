/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const userController = require('../controllers/user');
const authorized = require('../middlewares/auth');

router.get('/', authorized, userController.findAll);
router.get('/:id', authorized, userController.findById);
router.patch('/:id', authorized, userController.update);
router.delete('/:id', authorized, userController.delete);

module.exports = router;
