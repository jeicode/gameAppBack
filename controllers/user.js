const { response } = require("express");
const bcryptjs = require('bcryptjs')

// models
const User = require('../models/user');


const CreateUser = async (req, res = response) => {

    try {
        const {name, email, password, is_seller} = req.body;

        const user = new User({name, email, password, is_seller});

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save() // save DB
        res.json(user)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})


        
    }
    
}

module.exports = { CreateUser }