import pool from "../../db";

export default async function handler(req,res){
    try {
        const {id} = req.query;
        if (id === undefined) throw Error('query:id is required')
        const stock = await pool.query(`DELETE FROM stock WHERE id = ${id};`)
        res.status(202).json({message:"deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}