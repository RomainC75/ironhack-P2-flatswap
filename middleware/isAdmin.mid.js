const router = require('express').Router()

router.use( (req,res,next)=>{
    if(req.user.accessLevel==='admin'){
        next()
    }else{
        res.status(400).json({message:"unauthorized !"})
    }
})

module.exports = router