const router = require('express').Router()
const authentication = require('../middleware/authentication.mid')
const User = require('../models/User.model')
const Message = require('../models/Message.model')
const mongoose = require('mongoose')

router.get('/',authentication, async (req,res,next)=>{
    console.log('-->message:',req.body)
    try{
        const ans= await Message.find({
            $or:[ 
                {$and:[
                    {senderId: req.user._id } ,{receiverId: mongoose.Types.ObjectId(req.body.contactId) } 
                ]},  
                {$and:[ 
                    {senderId: mongoose.Types.ObjectId(req.body.contactId) } ,{receiverId: req.user._id} 
                ]} 
            ]
        }).select({senderId:1,createdAt:1,content:1}).sort({createdAt:1})
        res.status(200).json(ans)
    }catch(e){
        next(e)
    }
})

router.post('/',authentication ,async (req,res,next) => {
    try{
        if(req.user._id.toString()!=req.body.senderId){
            res.status(400).json({message:"senderId is not valid !"})
        }else if( req.body.senderId && req.body.receiverId && req.body.content && req.body.senderId === req.user._id.toString() && req.body.content.length>0){
            const receiver = await User.findById(req.body.receiverId)
            // test if receiver is ok to get new messages ! 
            if( receiver ){
                const ans = await Message.create( req.body )
                res.status(200).json(ans)
            }else{
                res.status(400).json({message:"user doesn't exist"})
            }
        }
    }catch(e){
        next(e)
    }
})

//check if the user has the rights (admin)
router.delete('/:id', authentication, async (req,res,next) => {
    try{
        const message = await Message.findById(req.params.id)
        console.log('-->',message)
        console.log(req.user._id ,message.senderId)
        if(req.user.accessLevel === 'admin' || req.user._id.toString() === message.senderId.toString()){
            await Message.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"message deleted"})
        }else{
            res.status(400).json({message:"cannot delete this message"})
        }
    }catch(e){
        next(e)
    }
})

module.exports = router

//{$or: [ {$and:[{senderId: ObjectId("62a8fafd30624e2ed08961a8")} ,{receiverId:ObjectId("62a9c002acac3c735946335a")} ]} ,  {$and:[ {senderId:ObjectId("62a9c002acac3c735946335a")} ,{receiverId:ObjectId("62a8fafd30624e2ed08961a8")} ]} ]}


//{ $and:[ {senderId:"62a9c002acac3c735946335a"} ,{receiverId:"62a8fafd30624e2ed08961a8"} ]} 

// const ans=Message.find({
//     $or:[ 
//         {$and:[
//             {senderId: ObjectId("62a8fafd30624e2ed08961a8") } ,{receiverId:ObjectId("62a9c002acac3c735946335a")} 
//         ]} ,  
//         {$and:[ 
//             {senderId:ObjectId("62a9c002acac3c735946335a")} ,{receiverId:ObjectId("62a8fafd30624e2ed08961a8")} 
//         ]} 
//     ]})