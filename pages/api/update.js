

export default async function handler(req,res){
    try {
        const {id,createAt,vendor,item,quantity,unit_price,total_cost} = req.body;
        const SQL = `UPDATE stock SET\b
        SET createAt=${createAt},\b
        SET vendor=${vendor},\b
        SET item=${item},\b
        SET quantity=${quantity},\b
        SET unit_price=${unit_price},\b
        SET total_cost=${total_cost}\b
        WHERE id = ${id};`
        // res.status(202).json({message:"updated"})
        res.status(202).send(SQL)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}