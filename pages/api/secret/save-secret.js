const Secret=require('../../../models/secret')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')


const saveLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            if(!req.headers.authorization){
                throw new Error('Not authorization!!!')
            }
            const token=req.headers.authorization.split(' ')[1];

            try{
                await jwt.verify(token, process.env.jwtSecret)
            }catch (e) {
                return res.status(401).json({message: e.message, status: 401})
            }
            const {
                content,
                category,
                date, lastEdited, description
            } = req.body;



            const secret = new Secret({
                content,
                category,
                date, lastEdited, description
            });
            await secret.save();
            res.status(201).json({
                message: 'Secret created',
                status: 201
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(saveLink)






