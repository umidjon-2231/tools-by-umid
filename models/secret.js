const {Schema}=require('mongoose')
const mongoose=require('mongoose')


const schema=new Schema({
    content: {type: Object, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    source: {type: String, required: false},
    date: {type: Number, required: true},
    lastEdited: {type: Number, required: true}
})

module.exports=mongoose.models.Secret || mongoose.model('Secret', schema)