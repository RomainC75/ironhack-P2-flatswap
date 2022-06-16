const db = require('../db/index')
const mongoose = require('mongoose')
const House = require('../models/House.model')
require('dotenv').config()
const data = require('./data')

const seed = async () =>{
    try{
        //console.log(data)
        // const ans = await House.create(data)
        const ans = await House.insertMany(data)
        console.log('------>ANS : ',ans)
        mongoose.connection.close()
    }catch(e){
        console.log('EROR : ',e)
    }
}

seed()