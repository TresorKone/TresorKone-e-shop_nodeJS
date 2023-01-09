// middleware for doing role-based permissions
const permit = (...permittedRoles) => {
    return (req, res, next) => {

        const currentUser = req.session.user
        
        if (currentUser && permittedRoles.includes(currentUser.role)) {
            next()
        } else {
            res.status(403).json('Forbidden');
        }
    }
}

exports.permit = permit;