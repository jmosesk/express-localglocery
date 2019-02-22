const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Product = require('../models/product');
var Vendor = require('../models/vendor');
var Type = require('../models/type');
var ProductInstance = require('../models/productinstance');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        product_count: function(callback) {
            Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        product_instance_count: function(callback) {
            ProductInstance.countDocuments({}, callback);
        },
        product_instance_location_count: function(callback) {
            ProductInstance.countDocuments({location:'Shop'}, callback);
        },
        vendor_count: function(callback) {
            Vendor.countDocuments({}, callback);
        },
        type_count: function(callback) {
            Type.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Glocery Home', error: err, data: results });
    });
};

// Display list of all product.
exports.product_list = function(req, res, next) {
  Product.find({}, 'name vendor')
    .populate('vendor')
    .exec(function (err, list_products) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('product_list', { title: 'Product List', product_list: list_products });
    });
    
};
// Display detail page for a specific product.
exports.product_detail = function(req, res, next) {
    async.parallel({
        product: function(callback) {

            Product.findById(req.params.id)
              .populate('vendor')
              .populate('type')
              .exec(callback);
        },
        product_instance: function(callback) {

          ProductInstance.find({ 'product': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.product==null) { // No results.
            var err = new Error('Product not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('product_detail', { title: 'Title', product: results.product, product_instances: results.product_instance } );
    });

};
// Display product create form on GET.
exports.product_create_get = function(req, res, next) {
 // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        vendors: function(callback) {
            Vendor.find(callback);
        },
        types: function(callback) {
            Type.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('product_form', { title: 'Create Product', vendors: results.vendors, types: results.types });
    });
    
};

// Handle product create on POST.
exports.product_create_post = [
    // Convert the type to an array.
    (req, res, next) => {
        if(!(req.body.type instanceof Array)){
            if(typeof req.body.type==='undefined')
            req.body.type=[];
            else
            req.body.type=new Array(req.body.type);
        }
        next();
    },

    // Validate fields.
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('vendor', 'Vendor must not be empty.').isLength({ min: 1 }).trim(),
    body('description', 'Description must not be empty.').isLength({ min: 1 }).trim(),  
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var product = new Product(
          { name: req.body.name,
            vendor: req.body.vendor,
            description: req.body.description,           
            type: req.body.type
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                vendors: function(callback) {
                    Vendor.find(callback);
                },
                types: function(callback) {
                    Type.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected typess as checked.
                for (let i = 0; i < results.types.length; i++) {
                    if (product.type.indexOf(results.types[i]._id) > -1) {
                        results.types[i].checked='true';
                    }
                }
                res.render('product_form', { title: 'Create Product',vendors:results.vendors, types:results.types, product: product, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save product.
            product.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new product record.
                   res.redirect(product.url);
                });
        }
    }
];

// Display productdelete form on GET.
exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete GET');
};

// Handle product delete on POST.
exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete POST');
};

// Display product update form on GET.
exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update GET');
};

// Handle product update on POST.
exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update POST');
};