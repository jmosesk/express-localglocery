var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    vendor: {type: Schema.Types.ObjectId, ref: 'Vendor', required: true},
    description: {type: String, required: true},   
    type: [{type: Schema.Types.ObjectId, ref: 'Type'}]
  }
);

// Virtual for product's URL
ProductSchema
.virtual('url')
.get(function () {
  return '/glocery/product/' + this._id;
});

//Export model
module.exports = mongoose.model('Product', ProductSchema);