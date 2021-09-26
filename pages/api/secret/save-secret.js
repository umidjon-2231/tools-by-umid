const Secret=require('../../../models/secret')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const crypto=require('crypto-js')


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
            } = req.body;
            const hashedContent=crypto.AES.encrypt(JSON.stringify(content), process.env.jwtSecret).toString()




            const secret = new Secret({
                content: hashedContent,
                category,
                date: Date.now(),
                lastEdited: Date.now()
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






