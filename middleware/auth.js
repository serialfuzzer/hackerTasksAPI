const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("./../jwtsecret");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY);
                req.user = user;
                return next();
            }catch(error){
                error.message = 'invalid/expired token';
                return next(error);
            }
        }
        error.message = 'Authorization token must be Bearer [token]';
        return next(error);
    }
    error.message = 'Unauthorized access';
    return next(error);
}