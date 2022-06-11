const router = require('express').Router();

const authService = require('../services/authService')
const {sessionName} = require('../constants')


router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login',async (req,res)=>{
    const token = await authService.login(req.body)
    if(!token){
       res.redirect('/404')
    }
    res.cookie(sessionName,token,{httpOnly: true})
       
    res.redirect('/')
})


router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    const user = await authService.register(req.body)
    if (user) {
        res.redirect('/auth/login')
    }else{
        res.redirect('/404')
    }
})

router.get('/logout',(req,res)=>{
     res.clearCookie(sessionName)
     res.redirect('/')
})

module.exports = router