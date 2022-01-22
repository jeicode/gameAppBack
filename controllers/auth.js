const { response } = require("express");

const { generateJWT } = require('../helpers/generate-jwt')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const login = async(req, res = response) => {

    const { email, password } = req.body
    
    
    try {
        // VERIFY if email exist in BD
        const user = await User.findOne({
            where: { 
                email: email
            }
        })

        if (!user) {
            return res.status(400).json({msg:`Email / Password are wrongs!`})
        }

        // verify is user is_Active 
        if (!user.is_active) {
            return res.status(400).json({msg:`Your account is inactive!`})
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({msg:`Email / Password are wrongs!`})
        }
        // Genrate JWT token
        const token = await generateJWT(user.id)
        req.user = user

        res.json({
            user, token
        })

        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }
}


module.exports = { login }