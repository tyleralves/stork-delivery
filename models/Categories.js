/**
 * Created by Tyler on 7/18/2016.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  path: String,
  children: [{
    id: String,
    name: String,
    path: String
  }]
});

mongoose.model('Category', CategorySchema);