export const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect('/dashboard');
};

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/');
};
