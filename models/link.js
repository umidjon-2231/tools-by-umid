const {Schema, Types}=require('mongoose')
const mongoose=require('mongoose')


const schema=new Schema({
    link: {type:String, required: true, unique: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Number, required: true}
})

module.exports=mongoose.models.Link || mongoose.model('Link', schema)