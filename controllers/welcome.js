var User = require("../models/user");

// var index = function(req, res, next) {
//   res.render('welcome/index',{ user: req.user });
// };

var index = function (req, res, next) {

  User.find({}, function(error, users){
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
      spots.sort(function(bot, top){
        return parseFloat(top.rating) - parseFloat(bot.rating);
      });
    });
    res.render('welcome/index', {spots: spots});
  });
};

module.exports = {
  index: index
};
