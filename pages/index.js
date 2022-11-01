import { useState } from "react"
import Maranchi from "../public/Maranchi.json"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { AiFillEdit } from "react-icons/ai"
import Head from "next/head"
export default function Home() {

  const [stock, setStock] = useState(Maranchi)
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
              Maranchi &&
              stock.map(({ Date, Vendor, Item, Quantity, Unit_Price, Total_Cost }) => {
                const key = Math.random()
                return (
                  <tr key={key} id={key}>
                    <td>{Date}</td>
                    <td>{Vendor}</td>
                    <td>{Item}</td>
                    <td>{Quantity}</td>
                    <td>{Unit_Price}</td>
                    <td>{Total_Cost}</td>
                    <td className="w3-center" onClick={()=>{updRow(key)}}><AiFillEdit /></td>
                    <td className="w3-center" onClick={()=>{delROw(key)}}><RiDeleteBin2Fill /></td>
                  </tr>
                )

              }
              )
            }
          </tbody>
        </table>
      </div>
      <div className="w3-padding"></div>
    </>
  )
}