const Role = require('../models/role');

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = await Role.create({
            name,
            description,
        });

        return res.status(201).send({ data: role });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const roles = await Role.find({}).sort({ updatedAt: -1 });
        return res.send({ data: roles });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).send({ message: 'role not found' });
        }

        return res.send({ data: role });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByIdAndDelete(roleId);
        if (!role) {
            return res.status(404).send({ message: 'role not found' });
        }

        return res.status(204).send();
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
};
