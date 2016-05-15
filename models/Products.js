/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
  description: String
});

mongoose.model('Product', ProductSchema);