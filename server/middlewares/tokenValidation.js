let jwt = require('jsonwebtoken')


let tokenValidation = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(404).json({ message: "token not available" })
    }

    let token = req.headers.authorization.split(' ')[1]

    
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    // 3. Verify token
    jwt.verify(token, '123', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // 4. Attach decoded user info to request
        req.user = decoded;

        console.log(decoded);


        // 5. Continue
        next();
    });

}

module.exports = tokenValidation