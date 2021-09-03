const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const editLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            const {_id, link, description, category, date} = req.body;
            const editedLink = await Link.updateOne({_id}, {link, description, category, date});

            if (!editedLink) {
                return res.status(400).json({
                    message: "Not find link with this id",
                    status: 400
                });
            }


            res.status(200).json({
                message: 'Link edited',
                status: 200,
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(editLink)






