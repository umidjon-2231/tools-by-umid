const jwt=require('jsonwebtoken')
const User=require('../../../models/user')
import connectDB from "../../../middleware/mongodb"


const handler=async (req, res)=> {
    if(req.method==="POST"){
        try {
            const {password, login}=req.body
            const user=await User.findOne({password, login})
            if(!user){
                return res.status(400).json({message: "Error password or login", status: 400})
            }

            const secretKey=process.env.jwtSecret

            const token=jwt.sign(
                {
                    password,
                    userId: user._id
                },
                secretKey,
                {expiresIn: '2h'}
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


