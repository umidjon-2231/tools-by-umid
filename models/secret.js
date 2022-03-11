
const {Schema, Types}=require('mongoose')
const mongoose=require('mongoose')


const schema=new Schema({
    content: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Number, required: true},
    lastEdited: {type: Number, required: true},
    user: {type: Types.ObjectId, ref: "User", required: true}
})

module.exports=mongoose.models.Secret || mongoose.model('Secret', schema)