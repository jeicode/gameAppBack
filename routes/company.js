const express = require('express')
const { check } = require('express-validator')

// controllers
const { CreateCompany, GetOneCompany, GetCompanies } = require('../controllers/company')
const {existCompanyByNIT} = require('../helpers/db-validators')

const {validateFields} = require('../middlewares/validate-fields')


const router = express.Router()

// api/companies/create
router.post('/create',[
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('start_year_activities').notEmpty().isNumeric().isLength(4),
    check('NIT').notEmpty().custom(existCompanyByNIT),
    validateFields
], CreateCompany )


// api/companies/:id
router.get('/:id',[], GetOneCompany )
router.get('/',[], GetCompanies )



module.exports = router;