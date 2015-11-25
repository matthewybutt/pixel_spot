var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var tagSchema = new mongoose.Schema({
  tag_name: String,
  created: { type: Date, default: Date.now }
});

var spotSchema = new mongoose.Schema({
  title:   String,
  description: String,
  image_url: String,
  address: String,
  rating: Number,
  tags: [tagSchema]
});

var userSchema = new mongoose.Schema({
  name:   String,
  email: String,
  spots: [spotSchema],
  googleId: String
});

var User = mongoose.model('User', userSchema);


module.exports = User;

