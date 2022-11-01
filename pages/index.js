import { useEffect, useState } from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { AiFillEdit } from "react-icons/ai"
import Head from "next/head"
export default function Home() {

  const [stock, setStock] = useState(null)


  useEffect(() => {
    fetch('/api/read')
      .then(res => {
        if (res.status === 200) return res.json()
        // else throw res.json()
      })
      .then(data => {
        setStock(data)
      })
      .catch(error => {
        console.log(error.message);
      })
  }, [])

  const updRow = k => {
  }

  const delROw = k => {
  }


  return (
    <>
      <Head>
        <title>MS | Dashboard</title>
      </Head>
      <header className="w3-center w3-margin-bottom">
        <h1 className="w3-opacity"><b>MARANCHI SOLUTION</b></h1>
        <p><b>Stock Dashboard</b></p>
      </header>
      <div className="w3-responsive">
        <table className="w3-table-all">
          <thead>
            <tr className="w3-dark-gray">
              <th>Date</th>
              <th>Vendor</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Cost</th>
              <th className="w3-center">Update</th>
              <th className="w3-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              stock &&
              stock.map(({ id,date, vendor, item, quantity, unit_price, total_cost }) => 
                <tr key={id} id={id}>
                  <td>{date}</td>
                  <td>{vendor}</td>
                  <td>{item}</td>
                  <td>{quantity}</td>
                  <td>{unit_price}</td>
                  <td>{total_cost}</td>
                  <td className="w3-center" onClick={() => { updRow(id) }}><AiFillEdit /></td>
                  <td className="w3-center" onClick={() => { delROw(id) }}><RiDeleteBin2Fill /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="w3-padding"></div>
    </>
  )
}