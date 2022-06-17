//require('dotenv').config('../.env')
require('../db/index')
const mongoose = require('mongoose')
const House = require('../models/House.model')
//require('dotenv').config()
const data = require('./data')
const User = require('../models/User.model')


const seed = async () =>{
    try{
        //console.log(data)
        // const ans = await House.create(data)
        await House.deleteMany()
        const allUsers = await User.find({accessLevel: 'user'})
        const adminUser = await User.find({accessLevel:'admin'})
        const ans = await House.insertMany(data)
        await Promise.all(ans.map(async(house,i)=>{
            if(i<4){
                await User.findByIdAndUpdate(allUsers[0],{ $push:{ ownedHouses:house._id } })
            }else{
                await User.findByIdAndUpdate(adminUser[0],{ $push:{ ownedHouses:house._id } })
            }
        }))
        mongoose.connection.close()
    }catch(e){
        console.log('EROR : ',e)
    }
}

seed()