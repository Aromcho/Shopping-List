import User from "../models/user.model.js";

// Retrieve all Users from the database.
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Find a single User with an id
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Create and Save a new User
export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email,
            password
        });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

// Update a User by the id in the request
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Delete a User with the specified id in the request
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}