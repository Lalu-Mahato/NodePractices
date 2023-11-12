const User = require('../models/user');
const CommonMethod = require('../utils/common-methods');

exports.register = async (req, res) => {
    try {
        const {
            name, email, password, role,
        } = req.body;
        const hashedPassword = CommonMethod.encryptText(password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: 'user already registered' });
        }

        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword,
        });

        user.password = undefined;
        return res.status(201).send({ message: 'User created', data: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(404).send({ message: 'user not found' });
        }

        const isMatch = CommonMethod.decryptText(existingUser.password, password);
        if (!isMatch) {
            return res.status(401).send({ message: 'mismatched password' });
        }
        const token = CommonMethod.generateToken({
            _id: existingUser._id,
            email: existingUser.email,
        });
        const response = {
            _id: existingUser._id,
            email: existingUser.email,
            status: existingUser.status,
            token,
        };
        return res.send({ message: 'User logged in', data: response });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};
