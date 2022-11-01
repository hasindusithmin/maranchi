import pool from "../../db";

export default async function handler(req,res){
    try {
        const stock = await pool.query('SELECT * FROM stock')
        const result = stock.rows;
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}