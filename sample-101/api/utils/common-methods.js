require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CommonMethod {
    static encryptText(text) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(text, salt);
        return hash;
    }

    static decryptText(encryptedText, text) {
        return bcrypt.compareSync(text, encryptedText);
    }

    static generateToken(payload, secret = process.env.JWT_SECRET) {
        const token = jwt.sign(payload, secret);
        return token;
    }
}

module.exports = CommonMethod;
