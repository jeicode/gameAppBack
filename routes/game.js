const express = require('express')
const { check } = require('express-validator')

// controllers
const { CreateGame, GetGames, GetOneGame, GetGamesSeller } = require('../controllers/game')
// helpers
const { notFoundCompanyById, notExistGameById }  = require('../helpers/db-validators')
// middelwares
const {validateFields} = require('../middlewares/validate-fields')
const { validarJWT } = require('../middlewares/validate-jwt')


const router = express.Router()

// api/games/create
router.post('/create',[
    validarJWT,
    check('title').notEmpty(),
    check('stock').notEmpty().isNumeric(),
    check('company_id').notEmpty().isNumeric(),
    check('company_id').custom(notFoundCompanyById),
    check('departure_date').isDate(),
    check('price').notEmpty().isFloat(),
    validateFields
], CreateGame )


// api/games/
router.get('/',[], GetGames )
router.get('/:id',[
    check('id').custom(notExistGameById),
    validateFields
], GetOneGame )


// api/games/seller/:id
router.get('/seller/:id',[
    validarJWT,
    validateFields
], GetGamesSeller )



module.exports = router;