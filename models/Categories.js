/**
 * Created by Tyler on 7/18/2016.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.schema({
  category: String,
  subCategories: [String]
});

mongoose.model('Category', CategorySchema);