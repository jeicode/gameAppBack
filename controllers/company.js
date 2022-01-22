const { response } = require("express");

// models
const Company = require('../models/company');
const Game = require("../models/game");


const CreateCompany = async (req, res = response) => {

    try {
        const company = new Company(req.body);
        // Encriptar contraseña
        await company.save() // save DB
        res.json(company)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }

    
}

const GetOneCompany = async (req, res = response) => {

    try {
        const {id} = req.params
        const company = await Company.findOne({
            where:{
                id
            }
        });
        const games = await Game.findAll({
            where:{
                company_id: id
            }
        })
        res.json({company, games})
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }

}


const GetCompanies = async (req, res = response) => {

    try {
        const companies = await Company.findAll();
        res.json(companies)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }

}


module.exports = { CreateCompany, GetOneCompany, GetCompanies }