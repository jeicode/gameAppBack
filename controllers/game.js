const { response } = require("express");
const { Op } = require("sequelize");

// models
const Game = require('../models/game');
const Company = require('../models/company');
const User = require('../models/user');

const { paginationData } = require("../helpers/pagination");



const CreateGame = async (req, res = response) => {

    try {
        const game = new Game({
            offered_by:req.user.id, 
            ...req.body,
        });

        // Encriptar contraseña
        await game.save() // save DB
        res.json(game)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }

    
}

const GetGames = async (req, res = response) => {

    const {offset, limit, page} = paginationData(req.query)

    try {
        const {count, rows:games} = await Game.findAndCountAll({ 
            include: [ Company, User],
            offset, 
            limit}
        );
        let total_pages = (count/limit) + 0.5 
        total_pages = Math.round(total_pages)
        const current_page = page + 1
        res.json({current_page, total_pages,games, count})
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }   
}

const GetGamesSeller = async (req, res = response) => {

    try {
        const {search = ""} = req.query
        const {offset, limit, page} = paginationData(req.query)

        // Query %%LIKE
        const query = {
            [Op.like] : `%${search}%`
         }

         let queryset = null

         if (search){
            queryset = {
                offered_by: req.params.id,  
                [Op.or]: [
                    { 
                        title: query
                    },
                    {
                        platform: query,
                    },
                    {
                        price: search
                    },
                    {
                        company_id: search
                    }
                ]
         }
         
        } 
        const {count, rows:games} = await Game.findAndCountAll({ 

            include: {
                model: Company,
            },
            where: queryset,
            offset, 
            limit }
        );

        let total_pages = (count/limit) + 0.5 
        total_pages = Math.round(total_pages)
        const current_page = page + 1

    
        res.json({count, current_page, total_pages,games})
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }   
}

const GetOneGame = async (req, res = response) => {

    const {id} = req.params

    try {
        const [game] = await Game.findAll({
            where: { id },
            include: [ Company, User ]
        });
        res.json(game)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})
    }   
}

module.exports = { CreateGame, GetGames, GetOneGame, GetGamesSeller }