const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const saveLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            const {
                link,
                description,
                category,
                date
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
                date
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






