const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('../db/config')
// const {dbConnection} = require('../database/config')


class Server {
    
    constructor() {
        this.port = process.env.PORT || 4000
        this.app = express()
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            games: '/api/games',
            companies: '/api/companies',
            purchases: '/api/purchases'
        }
 
        // connect to db
        this.connectDB()
        // middlewares => añaden funcionalidad a mi app
        this.middlewares()
        // routes app.
        this.routes()
    }

    async connectDB() {

        try {
            await db.authenticate();
            db.sync({force: false}).catch(err => {
                throw err
              })
            
            console.log("Database Online...")
            
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    middlewares() {

        this.app.use(cors())
        // parse y read body
        this.app.use(express.json())

        // configue messages HTTp
        this.app.use(morgan('dev'))

    }

    routes() {
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.games, require('../routes/game'))
        this.app.use(this.paths.companies, require('../routes/company'))
        this.app.use(this.paths.purchases, require('../routes/purchase'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto.....', this.port)
        })
    }
}

module.exports = Server;