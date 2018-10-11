var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Item = new Schema({
  id_vending: {
    type: String
  },
  id_item: {
    type: String
  },
  lat:{
    type:String
  },
  long:{
      type:String
  },
  amount:{
      type:Number
  },
  created_at:{
      type:Date
  }
},{
    collection: 'stock'
});

module.exports = mongoose.model('Stock', Item);