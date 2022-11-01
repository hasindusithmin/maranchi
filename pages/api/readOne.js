import pool from "../../db";
export default async function handler(req,res){
    try {
        const {id} = req.query;
        if (id === undefined) throw Error('query:id is required')
        const stock = await pool.query(`SELECT * from stock WHERE id = ${id}`)
        if (stock.rowCount === 0) throw Error("not found")
        const row = stock.rows[0];
        res.status(200).json(row)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}