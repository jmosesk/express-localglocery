var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VendorSchema = new Schema(
  {
    fname: {type: String, required: true, max: 100},
    lname: {type: String, required: true, max: 100},
    address: {type: String},
    phone: {type: String},
  }
);

// Virtual for vendor's full name
VendorSchema
.virtual('name')
.get(function () {
  return this.fname + ', ' + this.lname;
});

// Virtual for vendor's URL
VendorSchema
.virtual('url')
.get(function () {
  return '/glocery/vendor/' + this._id;
});

//Export model
module.exports = mongoose.model('Vendor', VendorSchema);