const User = require('../models/user');
const { DEFAULT } = require('../utils/constants');

exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || DEFAULT.PAGE;
        const limit = parseInt(req.query.limit, 10) || DEFAULT.LIMIT;
        const users = await User.find({})
            .populate('role', 'name description')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 });

        const count = await User.countDocuments({});
        const pagination = {
            no_of_records: count,
            no_of_pages: Math.ceil(count / limit),
            current_page: page,
        };
        return res.send({ data: users, pagination });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }
        return res.send({ data: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(userId, {
            name,
        }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }

        return res.send({ message: 'user updated', data: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }

        return res.status(204).send();
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};
