const mongoose = require('mongoose')
const { User } = require('./user')

const studySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    isFin:{
        type:Boolean,
        default:false
    }
})

const Study = mongoose.model('Study', studySchema)
module.exports = { Study }