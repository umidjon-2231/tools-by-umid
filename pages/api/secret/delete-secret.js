const Secret=require('../../../models/secret')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')


const deleteLink=async (req, res)=>{
    if(req.method==="DELETE"){
        try {
            if(!req.headers.authorization){
                throw new Error('Not authorization!')
            }

            const token=req.headers.authorization.split(' ')[1];
            const {_id} = req.body;

            try{
                await jwt.verify(token, process.env.jwtSecret)
            }catch (e) {
                return res.status(401).json({message: e.message, status: 401})
            }





            await Secret.findOneAndDelete({
                _id
            })


            res.status(200).json({
                message: 'Secret deleted',
                status: 200,
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(deleteLink)






