const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel')
const express = require('express')
const router = express.Router();
const upload = require('../middlewares/multerconfig')
require('dotenv').config();
//register user
router.post('/register', upload.single('profilepic'), async (req, res) => {
    try {
        const { username, password, verifypassword, email, checkbox } = req.body;
        const profilepic = req.file.path
        //checking if users email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered!' });
        }
        if (password !== verifypassword) {
            return res.status(400).json({ message: 'Password and Confirm Password do not match' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, profilepic, checkbox });
        await newUser.save();


        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)

        res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})



module.exports = router