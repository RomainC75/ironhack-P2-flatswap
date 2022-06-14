const { model, Schema, schemaTypes, default: mongoose } = require("mongoose")
const House = require("./House.model")

const houseSchema = new Schema(
    {
        categorie: {
            type: String,
          },
          roomnumber: {
            type: Number,
          },
          bedroom: {
            type: Number,
          },
          bathroom: {
              type:Number,
              bathtub:{
                  type: Boolean,
              },
              shower:{
                  type:Boolean,
              },
          },
          equipped_kitchen: {
              type:Boolean,
          },
          garden: {
              type: Boolean,
          },
          pool: {
              type: Boolean,
          },
          surface: {
              type:Number,
          },
          pet_friendly: {
              type: Boolean,
          },
          images:{
              type:[String],
          },

          presentation: {
              type: String,
          },
          adress: {
              street_name:{
                  type: String,
              },
              street_number: {
                  type: Number,
              },
              city: {
                  type: String,
              },
              country: {
                  type: String,
              }
          },
          available_period: {
              type: Boolean,
          },
          fixed_period: {
              type: Boolean,
          },
          }
          
    
    







const House = model('houses',houseSchema)
module.exports=House