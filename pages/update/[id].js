import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Update() {
    const router = useRouter();
    const [Id, setId] = useState(false)
    const [err, setErr] = useState(null)

    const [vendor,setVendor] = useState(null)
    const [item,setItem] = useState(null)
    const [quantity,setQuantity] = useState(null)
    const [unitPrice,setUnitPrice] = useState(null)
    const [totalCost,setTotalCost] = useState(null)

    useEffect(() => {
        const { id } = router.query;
        if (id !== undefined && !Id) {
            setId(Id)
            fetch(`/api/readOne?id=${id}`)
                .then(async (res) => {
                    const data = await res.json()
                    if (res.status === 200) {
                        const {vendor,item,quantity,unit_price,total_cost} = data;
                        setVendor(vendor)
                        setItem(item)
                        setQuantity(quantity)
                        setUnitPrice(unit_price)
                        setTotalCost(total_cost)
                    }
                    else throw Error(data['error'])
                })
                .catch(error => {
                    setErr(err.message)
                })
        }
    }, [])

    function updateRow(event) {
        event.preventDefault()
        console.log({vendor,item,quantity:parseInt(quantity),unit_price:parseInt(unitPrice),total_cost:parseInt(totalCost)});
    }


    return (
        <>
            <Head>
                <title>MS | update</title>
            </Head>
            {
                unitPrice &&
                <form method="post" onSubmit={updateRow} autoComplete="off" className="w3-padding">
                    <p>
                        <div><b>VENDOR</b></div>
                        <input className="w3-input w3-padding-16 w3-border" type="text" required="" name="vendor" value={vendor} onInput={e=>setVendor(e.target.value)} />
                    </p>
                    <p>
                        <div><b>ITEM</b></div>
                        <input className="w3-input w3-padding-16 w3-border" type="text" required="" name="item" value={item} onInput={e=>setItem(e.target.value)}  />
                    </p>
                    <p>
                        <div><b>QUANTITY</b></div>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required="" name="quantity" value={quantity} onInput={e=>setQuantity(e.target.value)} />
                    </p>
                    <p>
                        <div><b>UNIT PRICE</b></div>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required="" name="unit_price" value={unitPrice} onInput={e=>setUnitPrice(e.target.value)} />
                    </p>
                    <p>
                        <div><b>TOTAL COST</b></div>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required="" name="total_cost" value={quantity * unitPrice} onInput={e=>setTotalCost(e.target.value)} />
                    </p>
                    <p><button className="w3-button w3-black w3-block" type="submit">UPDATE</button></p>
                </form>
            }
        </>
    )
}