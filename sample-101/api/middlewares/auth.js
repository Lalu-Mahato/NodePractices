const jwt = require('jsonwebtoken');
const User = require('../models/user');

// eslint-disable-next-line consistent-return
const authorized = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            // eslint-disable-next-line prefer-destructuring
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).send({ message: 'Invalid token' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decode.email });
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized user' });
        }

        req.authorizedUser = user;
        next();
    } catch (e) {
        return res.status(401).send({ message: e });
    }
};

module.exports = authorized;
