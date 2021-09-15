const jwt=require('jsonwebtoken')
const User=require('../../../models/user')
import connectDB from "../../../middleware/mongodb"


const handler=async (req, res)=> {
    if(req.method==="POST"){
        try {
            const {password}=req.body
            if(!req.headers.authorization){
                throw new Error('Not authorization!!')
            }
            const tokenS=req.headers.authorization.split(' ')[1];

            try{
                await jwt.verify(tokenS, process.env.jwtSecret)
            }catch (e) {
                return res.status(401).json({message: e.message, status: 401})
            }




            const user=await User.findOne({password})
            if(!user){
                return res.status(400).json({message: "Error password", status: 400})
            }

            const secretKey=process.env.jwtSecret

            const token=jwt.sign(
                {
                    password
                },
                secretKey,
                {expiresIn: '1h'}
            )
            res.json({token, status: 200})
        }catch (e) {
            res.status(500).json({message: e.message, status: 500})
        }
    }else{
        res.status(200).json({method: req.method})
    }

}
export default connectDB(handler)


