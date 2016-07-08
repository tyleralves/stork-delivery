/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, unique:true},
  category: String,
  salePrice: Number,
  description: String,
  mediumImage: String,
  deal: Boolean,
  quantity: Number
});

mongoose.model('Product', ProductSchema);