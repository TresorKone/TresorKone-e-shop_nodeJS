// middleware for doing role-based permissions
export default function permit(...permittedRoles) {
    return (req, res, next) => {

        const currentUser = req.session.user

        // TODO: add role field in database
        if (currentUser && permittedRoles.includes(currentUser.role)) {
            next()
        } else {
            res.status(403).json('Forbidden');
        }
    }
}