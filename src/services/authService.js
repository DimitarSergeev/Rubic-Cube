
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const saltRound = 10

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