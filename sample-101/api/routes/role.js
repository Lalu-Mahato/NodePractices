/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const roleController = require('../controllers/role');

router.post('/', roleController.create);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findById);
router.delete('/:id', roleController.delete);

module.exports = router;
