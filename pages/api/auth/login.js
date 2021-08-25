const jwt=require('jsonwebtoken')
const config=require('config')
const User=require('../../../models/User')
import connectDB from "../../../middleware/mongodb"


const handler=async (req, res)=> {
    if(req.method==="POST"){
        try {
            const {password}=req.body
            const user=await User.findOne({password})
            if(!user){
                return res.status(400).json({message: "Error password", status: 400})
            }


            if(password!==user.password){
                return res.status(400).json({
                    message: 'Error password',
                    status: 400})
            }

            const token=jwt.sign(
                {userId: user.id},
                process.env.jwtSecret,
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


