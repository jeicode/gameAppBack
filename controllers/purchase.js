const { response } = require("express");
const { paginationData } = require("../helpers/pagination");
const Game = require("../models/game");
const Purchase = require("../models/purchase");
const User = require("../models/user");



const CreatePurchase = async (req, res = response) => {

    try {
        const {number_copies_purchased, game_id} = req.body

        const {stock} = await Game.findByPk(game_id)

        if (number_copies_purchased > stock){
            return res.json({msg:`Hay ${stock} unidades disponibles`, status:false})
        }
        await Game.update(
            { stock: stock - number_copies_purchased},
            { where: { id: game_id } }
        )
        const purchase = new Purchase(req.body);
        await purchase.save() // save DB
        res.json(purchase)
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})


        
    }
    
}

const ListPurchasesSeller = async (req, res = response) => {

    try {
        const {offset, limit, page} = paginationData(req.query)
        const {count, rows:purchases} = await Purchase.findAndCountAll({
            where:{
                seller_id: req.user.id
            },
            order: [
                ['createdAt', 'DESC'],
            ],  
            include: [
                { 
                    model: User,
                },
                { 
                    model: User,
                },
                {
                    model: Game
                }
            
            ],
            offset, 
            limit,
         
        })
        console.log("purchases ", purchases)
        let total_pages = (count/limit) + 0.5 
        total_pages = Math.round(total_pages) -1
        const current_page = page + 1

        res.json({count, current_page, total_pages, purchases})
        
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'Somenthing goes wrong :/!'})


        
    }
    
}


module.exports = { CreatePurchase, ListPurchasesSeller}