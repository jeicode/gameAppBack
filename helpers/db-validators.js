// models
const User = require('../models/user')
const Company = require('../models/company');
const Game = require('../models/game');


const existUserByEmail = async (email = '') => {
    
    const user_exist = await User.findOne({
        where: { 
            email: email
        }
    });

    if (user_exist) {
        throw new Error(`Email ${email} already exist!`)
    }
} 


const existUserById = async (id) => {
    const user_exist = await User.findByPk(id);
    if (user_exist) {
        throw new Error(`User already exist!`)
    }
} 

const notExistUserById = async (id) => {
    const user_exist = await User.findByPk(id);
    if (!user_exist) {
        throw new Error(`User not exist!`)
    }
} 

// ----------------------------------------

const notFoundCompanyById = async (id ) => {
    
    const company_exist = await Company.findByPk(id);

    if (!company_exist) {
        throw new Error(`Company not exist!`)
    }
}

const existCompanyByNIT = async (NIT = '') => {
    
    const company_exist = await Company.findOne({
        where: { 
            NIT
        }
    });

    if (company_exist) {
        throw new Error(`Company with NIT ${NIT} already exist!`)
    }
}


// ----------------------------------------
const notExistGameById = async (id) => {
    const user_exist = await Game.findByPk(id);
    if (!user_exist) {
        throw new Error(`Game not exist!`)
    }
}




module.exports = {
        existUserById, 
        existUserByEmail, 
        notFoundCompanyById, 
        existCompanyByNIT,
        notExistGameById,
        notExistUserById
    }