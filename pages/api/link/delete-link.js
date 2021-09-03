const Link=require('../../../models/link')
import connectDB from "../../../middleware/mongodb"


const deleteLink=async (req, res)=>{
    if(req.method==="POST"){
        try {
            const {id} = req.body;
            const deletedLink = await Link.findOneAndDelete({
                _id: id
            });

            if (!deletedLink) {
                return res.status(400).json({
                    message: "Not find link with this id",
                    status: 400
                });
            }


            res.status(200).json({
                message: 'Link deleted',
                status: 200,
                deletedLink
            });

        }catch (e) {
            res.status(500).json({message: e.message, status: 500, error: e})
        }
    }

}
export default connectDB(deleteLink)






