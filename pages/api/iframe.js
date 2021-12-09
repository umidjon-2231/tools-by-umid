import axios from "axios";

const jwt=require('jsonwebtoken')


const handler=async (req, res)=> {
    if(req.method==="POST"){
        try {
            const {url}=JSON.parse(req.body)
            const response=await axios.get(url, {headers: {"Content-type": "text/html"}})
            res.status(200).json({data: response.data})
        }catch (e) {
            res.status(500).json({message: e.message, status: 500})
        }
    }else{
        res.status(200).json({method: req.method})
    }

}
export default handler


