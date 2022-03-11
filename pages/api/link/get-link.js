import {FilterQuery} from "mongoose";

const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')


const getLink=async (req, res)=> {
    if(req.method==="GET"){
        try {
            if(!req.headers.authorization){
                throw new Error('Not authorization!')
            }
            const token=req.headers.authorization.split(' ')[1];
            let userId=""
            try{
                const parsedToken=await jwt.verify(token, process.env.jwtSecret)
                userId=parsedToken.userId;
            }catch (e) {
                return res.status(401).json({
                    message: 'There is no space on the server for hackers',
                    status: 401
                })
            }
            const hasLink=await Link.find({user: userId})

            res.status(200).json({message: 'Ok!', status: 200, data:  hasLink})

        }catch (e) {
            if(e.message==='Not authorization'){
                return res.status(401).json({message: e.message, status: 401})
            }
            res.status(500).json({message: e.message, status: 500})
        }
    }

}
export default connectDB(getLink)






