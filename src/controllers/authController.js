const router = require('express').Router();

const authService = require('../services/authService')


router.get('/login', (req, res) => {
    res.render('auth/login')
})

// router.post('/login',(req,res)=>{

// })


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

module.exports = router