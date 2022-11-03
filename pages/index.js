import { useEffect, useState } from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import {GrChapterAdd} from "react-icons/gr"

import Head from "next/head"
import Link from "next/link"
export default function Home() {

  const [stock, setStock] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/read')
      .then(async (res) => {
        const data = await res.json()
        if (res.status === 200) setStock(data)
        else throw Error(data['error'])
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])

  return (
    <>
      <Head>
        <title>MS | Dashboard</title>
      </Head>
      <div className="w3-responsive">
        {
          error &&
          <div className="w3-panel w3-leftbar w3-pale-red w3-large w3-serif">
            <p><i>'{error}.'</i></p>
          </div>
        }
        {
          stock &&

          <>
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
                  stock.map(({ id, date, vendor, item, quantity, unit_price, total_cost }) =>
                    <tr key={id} id={id}>
                      <td>{date}</td>
                      <td>{vendor}</td>
                      <td>{item}</td>
                      <td>{quantity}</td>
                      <td>{unit_price}</td>
                      <td>{total_cost}</td>
                      <td className="w3-center" title="Edit">
                        <Link href={`/update/${id}`}><FiEdit /></Link>
                      </td>
                      <td className="w3-center" title="Delete">
                        <Link href={`/delete/${id}`}><RiDeleteBin2Fill /></Link>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <Link href="/create" className="w3-button w3-gray w3-block" title="ADD"><GrChapterAdd /></Link>
          </>

        }
      </div>
      <div className="w3-padding"></div>
    </>
  )
}