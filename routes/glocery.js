var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var vendor_controller = require('../controllers/vendorController');
var type_controller = require('../controllers/typeController');
var product_instance_controller = require('../controllers/productinstanceController');

/// PRODUCT ROUTES ///

// GET glocery home page.
router.get('/', product_controller.index);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get('/product/create', product_controller.product_create_get);

// POST request for creating Product.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete Product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete Product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update Product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update Product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one Product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all Product items.
router.get('/products', product_controller.product_list);

/// VENDOR ROUTES ///

// GET request for creating Vendor. NOTE This must come before route for id (i.e. display vendor).
router.get('/vendor/create', vendor_controller.vendor_create_get);

// POST request for creating Vendor.
router.post('/vendor/create', vendor_controller.vendor_create_post);

// GET request to delete Vendor.
router.get('/vendor/:id/delete', vendor_controller.vendor_delete_get);

// POST request to delete Vendor.
router.post('/vendor/:id/delete', vendor_controller.vendor_delete_post);

// GET request to update Vendor.
router.get('/vendor/:id/update', vendor_controller.vendor_update_get);

// POST request to update Vendor.
router.post('/vendor/:id/update', vendor_controller.vendor_update_post);

// GET request for one Vendor.
router.get('/vendor/:id', vendor_controller.vendor_detail);

// GET request for list of all Vendors.
router.get('/vendors', vendor_controller.vendor_list);

/// TYPE ROUTES ///

// GET request for creating a typee. NOTE This must come before route that displays Type (uses id).
router.get('/type/create', type_controller.type_create_get);

//POST request for creating Type.
router.post('/type/create', type_controller.type_create_post);

// GET request to delete Type.
router.get('/type/:id/delete', type_controller.type_delete_get);

// POST request to delete Type.
router.post('/type/:id/delete', type_controller.type_delete_post);

// GET request to update Type.
router.get('/type/:id/update', type_controller.type_update_get);

// POST request to update Type.
router.post('/type/:id/update', type_controller.type_update_post);

// GET request for one Type.
router.get('/type/:id', type_controller.type_detail);

// GET request for list of all Type.
router.get('/types', type_controller.type_list);

/// PRODUCTINSTANCE ROUTES ///

// GET request for creating a ProductInstance. NOTE This must come before route that displays ProductInstance (uses id).
router.get('/productinstance/create', product_instance_controller.productinstance_create_get);

// POST request for creating ProductInstance. 
router.post('/productinstance/create', product_instance_controller.productinstance_create_post);

// GET request to delete ProductInstance.
router.get('/productinstance/:id/delete', product_instance_controller.productinstance_delete_get);

// POST request to delete ProductInstance.
router.post('/productinstance/:id/delete', product_instance_controller.productinstance_delete_post);

// GET request to update ProductInstance.
router.get('/productinstance/:id/update', product_instance_controller.productinstance_update_get);

// POST request to update ProductInstance.
router.post('/productinstance/:id/update', product_instance_controller.productinstance_update_post);

// GET request for one ProductInstance.
router.get('/productinstance/:id', product_instance_controller.productinstance_detail);

// GET request for list of all ProductInstances.
router.get('/productinstances', product_instance_controller.productinstance_list);

module.exports = router;