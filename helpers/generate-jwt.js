const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload,process.env.PRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                resolve(token)
            }
        })
    })

}

module.exports = {
    generateJWT
}