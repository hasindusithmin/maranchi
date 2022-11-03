
import pool from "../../db"

export default async function handler(req,res){
    try {
        const {id,quantity} = req.body;
        const SQL = `UPDATE stock\r
        SET vendor='${vendor}',\r
        item='${item}',\r
        quantity=${quantity},\r
        unit_price=${unit_price},\r
        total_cost=${total_cost}\r
        WHERE id = ${id};`
        const result = await pool.query(SQL)
        res.status(202).json({message:"updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}