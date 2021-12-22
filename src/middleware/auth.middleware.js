const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    } else if (token !== 'admin') {
        return res.status(403).send({
            message: "Not a valid token!"
        });
    }
    next();


};

module.exports = {
    verifyToken
}