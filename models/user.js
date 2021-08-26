const {Schema}=require('mongoose')
const mongoose=require('mongoose')


const schema=new Schema({
    password: {type:String, required: true},
})

module.exports=mongoose.models.User || mongoose.model('User', schema)