const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"
const jwt=require('jsonwebtoken')


const saveLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            if(!req.headers.authorization){
                throw new Error('Not authorization.')
            }
            const token=req.headers.authorization.split(' ')[1];
            let userId=""
            try{
                const parsedToken=await jwt.verify(token, process.env.jwtSecret)
                userId=parsedToken.userId
            }catch (e) {
                return res.status(401).json({message: e.message, status: 401})
            }
            const {
                link,
                description,
                category,
                date, type, lastEdited
            } = req.body;


            const hasLink = await Link.findOne({
                link
            });

            if (hasLink) {
                return res.status(400).json({
                    message: "This link has already been saved",
                    status: 400
                });
            }

            const newLink = new Link({
                link,
                description,
                category,
                date, type, lastEdited, user: userId
            });
            await newLink.save();
            res.status(201).json({
                message: 'Link created',
                status: 201
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(saveLink)






