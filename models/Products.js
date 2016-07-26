/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, unique:true, index: true},
  categoryNode: String,
  category: {type: String, index: true},
  midCategory: String,
  subCategory: String,
  salePrice: Number,
  description: String,
  mediumImage: String,
  deal: Boolean,
  quantity: Number
});

ProductSchema.index({name:'text'});

mongoose.model('Product', ProductSchema);