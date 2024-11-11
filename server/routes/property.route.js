const express = require('express');
const propertyController = require('../controllers/property.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/add', authMiddleware, propertyController.addProperty);
router.get('/get', authMiddleware, propertyController.getAllProperties);
router.get('/get/:id', authMiddleware, propertyController.getProperty);
router.put('/update/:id', authMiddleware, propertyController.updateProperty);
router.delete('/delete/:id', authMiddleware, propertyController.deleteProperty);

//buyer
router.get('/buyer/get', propertyController.getPropertiesForBuyer);
router.get('/:id/seller', authMiddleware, propertyController.getPropertyWithSeller);
router.post('/:id/like', authMiddleware, propertyController.addLikeProperty);
router.post('/:id/interested', authMiddleware, propertyController.interestedInProperty);

module.exports = router;
