const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const itemController = require('../../controllers/item.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), validate(authValidation.item), itemController.createItem);
router.get('/items/:id',auth(), itemController.getItem);
router.post('/:id', auth(),  itemController.getUserItems);
router.delete('/:id', auth(),  itemController.deleteItem);
router.post('/items/csv', auth(),  itemController.exportcsv);

module.exports = router;