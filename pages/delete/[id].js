import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import validator from "validator"

export default function Update() {
    const router = useRouter();
    const [Id, setId] = useState(false)

    const [vendor, setVendor] = useState(null)
    const [item, setItem] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [unitPrice, setUnitPrice] = useState(null)
    const [totalCost, setTotalCost] = useState(null)

    const [notification, setNotification] = useState(null)
    const [className, setClassName] = useState(null)

    useEffect(() => {
        const { id } = router.query;
        if (id !== undefined && !Id) {
            setId(id)
            fetch(`/api/readOne?id=${id}`)
                .then(async (res) => {
                    const data = await res.json()
                    if (res.status === 200) {
                        const { vendor, item, quantity, unit_price, total_cost } = data;
                        setVendor(vendor)
                        setItem(item)
                        setQuantity(quantity)
                        setUnitPrice(unit_price)
                        setTotalCost(total_cost)
                    }
                    else throw Error(data['error'])
                })
                .catch(error => {
                    setNotification(error.message)
                })
        }
    }, [])

    async function deleteRow() {
        fetch(`/api/deleteOne?id=${Id}`)
            .then(async(res)=>{
                const data = await res.json();
                const message = data['message']
                if (res.status === 202) {
                    setClassName('w3-panel w3-leftbar w3-pale-green w3-large w3-serif')
                    setNotification(message)
                    setTimeout(()=>{router.replace('/')},1500)
                }
                else {
                    setClassName('w3-panel w3-leftbar w3-pale-red w3-large w3-serif')
                    setNotification(message)
                }
            })
    }

    return (
        <>
            <Head>
                <title>MS | delete</title>
            </Head>
            {
                notification &&
                <div className={className}>
                    <p><i>"{notification}."</i></p>
                </div>
            }
            {
                unitPrice &&
                <div className="w3-padding w3-responsive">
                    <table className="w3-table-all">
                        <tbody>
                            <tr>
                                <td>vendor</td><td>{vendor}</td>
                            </tr>
                            <tr>
                                <td>item</td><td>{item}</td>
                            </tr>
                            <tr>
                                <td>quantity</td><td>{quantity}</td>
                            </tr>
                            <tr>
                                <td>unitPrice</td><td>{unitPrice}</td>
                            </tr>
                            <tr>
                                <td>totalCost</td><td>{totalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="w3-button w3-block w3-pale-red" onClick={deleteRow}>DELETE</button>
                </div>
            }
        </>
    )
}