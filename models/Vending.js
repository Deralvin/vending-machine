var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Item = new Schema({
  name: {
    type: String
  },
  longlat: {
    type: String
  }
},{
    collection: 'vending'
});

module.exports = mongoose.model('Vending', Item);