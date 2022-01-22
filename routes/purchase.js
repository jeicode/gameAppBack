const express = require('express')
const { check } = require('express-validator')

// controllers
const { CreatePurchase, ListPurchasesSeller } = require('../controllers/purchase')
// helpers
const { notExistGameById, notExistUserById }  = require('../helpers/db-validators')
// middelwares
const {validateFields} = require('../middlewares/validate-fields')
const { validarJWT } = require('../middlewares/validate-jwt')


const router = express.Router()

// api/purchases/create
router.post('/create',[
    validarJWT,
    check('number_copies_purchased').isNumeric().notEmpty(),
    check('game_id').custom(notExistGameById),
    check('buyer_id').custom(notExistUserById),
    check('seller_id').custom(notExistUserById),
    validateFields
], CreatePurchase )

// api/users/register
router.get('/seller',[
    validarJWT,
    validateFields
], ListPurchasesSeller )

module.exports = router;