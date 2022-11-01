import pool from "../../db";

export default async function handler(req,res){
    try {
        const stock = await pool.query('SELECT * FROM stock')
        res.status(200).json(stock.rows)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}