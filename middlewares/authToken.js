const jwt = require("jsonwebtoken");

module.exports = function authToken(req, res, next){
    const token = req.header("auth_token");
    if(!token) return res.status(401).json({message: "Access Denied"});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid Token"});
    }
}