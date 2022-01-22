const { response } = require('express');
const express = require('express')
const { check } = require('express-validator')

// controllers
const { CreateUser } = require('../controllers/user')
// helpers
const { existUserByEmail  }  = require('../helpers/db-validators')
// middelwares
const {validateFields} = require('../middlewares/validate-fields')


const router = express.Router()

// api/users/register
router.post('/register',[
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('email','Email not valid').isEmail(),
    check('email').custom(existUserByEmail),
    check('is_seller').notEmpty().isBoolean(),
    validateFields
], CreateUser )

module.exports = router;