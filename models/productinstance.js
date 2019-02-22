var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductInstanceSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Produt', required: true }, //reference to the associated product   
    location: {type: String, required: true, enum: ['Store','Out of stock'], default: 'Shop'},
    qty: {type: String, required: true}
  }
);

// Virtual for productinstance's URL
ProductInstanceSchema
.virtual('url')
.get(function () {
  return '/glocery/productinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('ProductInstanceSchema', ProductInstanceSchema);