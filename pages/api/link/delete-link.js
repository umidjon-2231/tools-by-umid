const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')


const deleteLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            if(!req.headers.authorization){
                throw new Error('Not authorization')
            }

            const token=req.headers.authorization.split(' ')[1];
            const {id} = req.body;

            try{
                await jwt.verify(token, process.env.jwtSecret)
            }catch (e) {
                return res.status(401).json({message: e.message, status: 401})
            }





            const deletedLink = await Link.findOneAndDelete({
                _id: id
            });

            if (!deletedLink) {
                return res.status(400).json({
                    message: "Not find link with this id",
                    status: 400
                });
            }


            res.status(200).json({
                message: 'Link deleted',
                status: 200,
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(deleteLink)






