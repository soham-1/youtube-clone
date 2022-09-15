import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.JWT, (err, user) => { // user parameter can be named anything
        if (err) return res.status(403).send("Token not valid");
        req.user = user; // we set a custom field 'user' in req to the value user
        next(); // passes the request to next function called after it in route
    })
}