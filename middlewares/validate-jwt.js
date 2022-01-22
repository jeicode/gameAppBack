const { response } = require('express')
const jwt = require('jsonwebtoken')
const  User = require('../models/user')

const validarJWT =  async(req, res = response, next) => {

    // leer el header and token
    const token = req.header('x-token')

    if (!token) return res.status(401).json({msg:'No hay  token en la peticion'})
    
    try {
        // verificar si el token es validox,Retorna el uid del usuario
        const { uid:id } = jwt.verify(token, process.env.PRIVATEKEY)
        
        const user = await User.findByPk(id)

        // verificar si le usuario existe en la BD
        if (!user) {
            return res.status(401).json({msg:'Token No valido'})
        }
        // verificar si el usuario esta activo
        if (!user.is_active) {
            return res.status(401).json({msg:'Token No valido'})
        }
        // set user in current app
        req.user = user 
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({msg:'Token No Valido!'})  
    }
    
}


module.exports = {
    validarJWT
}