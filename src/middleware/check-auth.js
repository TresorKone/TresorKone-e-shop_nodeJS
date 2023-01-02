//middleware for routes protection by using a check on the existing user session
//TODO:to setup later when needed


module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}