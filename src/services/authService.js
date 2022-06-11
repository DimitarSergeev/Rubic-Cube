
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const {saltRound,secret} = require('../constants')


exports.register = async ({username,password,repeatPassword})=>{
         if (password !== repeatPassword) {
             return false
         }

         let hashedPass = await bcrypt.hash(password,saltRound)

         return User.create({
             username,
             password: hashedPass
         })
}

exports.login = async ({username,password})=>{
    let user = await User.findOne({username})

    if (!user) {
        return
    }

    const isValid = bcrypt.compare(password,user.password)

    if(!isValid){
        return
    }
    
    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });
    return result
}