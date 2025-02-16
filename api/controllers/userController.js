const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
} 

// LOGIN user
const loginUser = async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email,password);

        // Creating token
        const token = createToken(user._id);

        res.status(200).json({ email, token })
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }

    // res.json({msg: "Login User"});
}

// SIGNUP user
const signupUser = async(req, res) => {
    const{ email, password } = req.body
    try{
        const user = await User.signup(email,password);

        // Creating token
        const token = createToken(user._id);

        res.status(200).json({ email, token })
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }

    // res.json({msg: "Signup User"});
}

module.exports = { loginUser, signupUser }