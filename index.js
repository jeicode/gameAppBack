require('dotenv').config()

const Server = require('./models/server')

function initApp(){
    const server = new Server()
    server.listen()

}

initApp()
