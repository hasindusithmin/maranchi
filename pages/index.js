import { useState } from "react"
import Maranchi from "../public/Maranchi.json"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { AiFillEdit } from "react-icons/ai"
export default function Home() {

  const [stock, setStock] = useState(Maranchi)


  return (
    <>
      <header className="w3-center w3-margin-bottom">
        <h1 className="w3-opacity"><b>MARANCHI SOLUTION</b></h1>
        <p><b>The stock dashboard</b></p>
      </header>
      <div className="w3-responsive">
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>Date</th>
              <th>Vendor</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Cost</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              Maranchi &&
              stock.map(({ Date, Vendor, Item, Quantity, Unit_Price, Total_Cost }) =>
                <tr key={Date}>
                  <td>{Date}</td>
                  <td>{Vendor}</td>
                  <td>{Item}</td>
                  <td>{Quantity}</td>
                  <td>{Unit_Price}</td>
                  <td>{Total_Cost}</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}