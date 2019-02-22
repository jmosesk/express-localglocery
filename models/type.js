var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypeSchema = new Schema(
  {    
    name: {type: String, required: true}
  }
);

// Virtual for type's URL
TypeSchema
.virtual('url')
.get(function () {
  return '/glocery/type/' + this._id;
});

//Export model
module.exports = mongoose.model('Type', TypeSchema);