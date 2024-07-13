const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({
    note:{
        type:String
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    instruction:{
        type:String
    }
})
const Notemodel=mongoose.model('NoteData',noteSchema)
module.exports=Notemodel