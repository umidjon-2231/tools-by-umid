const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const getLink=async (req, res)=> {
    if(req.method==="GET"){
        try {
            const hasLink=await Link.find()

            res.status(200).json({message: 'Ok!', status: 200, data:  hasLink})

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(getLink)






