import pool from "../../db"

export default async function handler(req,res){
    try {
        const {date,vendor,item,quantity,unit_price,total_cost} = req.body;
        const SQL = `INSERT INTO stock (date,vendor,item,quantity,unit_price,total_cost) VALUES\r
        ('${date}','${vendor}','${item}',${quantity},${unit_price},${total_cost});`
        const result = await pool.query(SQL)
        res.status(201).json({message:"created"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}