

export default async function handler(req,res){
    try {
        const {id,createAt,vendor,item,quantity,unit_price,total_cost} = req.body;
        console.log({id,createAt,vendor,item,quantity,unit_price,total_cost});
        res.status(202).json({message:"updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}