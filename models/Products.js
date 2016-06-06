/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, unique:true},
  brand: String,
  category: String,
  price: Number,
  description: String,
  deal: Boolean,
  quantity: Number
});

mongoose.model('Product', ProductSchema);