/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

mongoose.model('User', UserSchema);