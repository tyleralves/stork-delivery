/**
 * Created by Tyler on 5/16/2016.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
});

mongoose.model('User', UserSchema);