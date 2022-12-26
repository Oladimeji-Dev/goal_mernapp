const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:"String",
        required:[true,"Please enter Your name"]
    },
    email:{
        type:"String",
        required:[true,"Please enter Your email"]
    },
    password:{
        type:"String",
        required:[true,"Please enter Your password"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)