const jwt=require('jsonwebtoken')
const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const handler=async (req, res)=> {
    if(req.method==="POST"){
        try {
            const {link, description, category, date}=req.body
            const hasLink=await Link.findOne({link})
            if(hasLink){
                return res.status(400).json({message: "This link has already been saved", status: 400})
            }
            const newLink=new Link({link, description, category, date})
            await newLink.save()
            res.status(201).json({message: 'Link created', status: 201})

        }catch (e) {
            res.status(500).json({message: e.message, status: 500})
        }
    }else{
        res.status(200).json({method: req.method})
    }

}
export default connectDB(handler)






