export default null;

export const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Not authorized');
  return res.redirect('/users/login');
};
