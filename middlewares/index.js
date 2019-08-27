const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please, login first before you can create a spot.');
  return res.redirect('/users/login');
};

module.exports = middleware;
