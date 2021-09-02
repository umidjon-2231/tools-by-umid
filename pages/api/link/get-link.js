const jwt=require('jsonwebtoken')
const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const handler=async (req, res)=> {
    if(req.method==="GET"){
        try {
            const hasLink=await Link.find()
            // if(hasLink){
            //     return res.status(400).json({message: "This link has already been saved", status: 400})
            // }

            res.status(200).json({message: 'Ok!', status: 200, data:  hasLink})

        }catch (e) {
            res.status(500).json({message: e.message, status: 500})
        }
    }else{
        res.status(200).json({method: req.method})
    }

}
export default connectDB(handler)






