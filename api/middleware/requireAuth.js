const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth = async(req, res, next) => {

    const SECRET = process.env.SECRET || maxverstappen3timeworldchampion

    // Verify Authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const { _id } = jwt.verify(token, SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }catch(error){
        console,log(error)
        res.status(401).json({error: 'Unauthorized Request'})
    }
}

module.exports = requireAuth