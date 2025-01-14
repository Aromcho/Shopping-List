import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) console.log(err);
            res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'User created successfully', user });
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) console.log(err);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful', user });
        });
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
        
    }
}

export const profile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
