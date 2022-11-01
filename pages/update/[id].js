import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Update() {
    const router = useRouter();
    const [Id, setId] = useState(false)
    const [err, setErr] = useState(null)

    const [createAt, setCreateAt] = useState(null)
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
                        const { createAt, vendor, item, quantity, unit_price, total_cost } = data;
                        setCreateAt(createAt)
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

    async function updateRow(event) {
        event.preventDefault()
        const row = {
            id: parseInt(Id),
            createAt,
            vendor,
            item,
            quantity: parseInt(quantity),
            unit_price: parseInt(unitPrice),
            total_cost: parseInt(totalCost)
        };
        const res = await fetch('/api/update', {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        })
        const data = await res.json();
        const message = data['message'];

        if (res.status === 202) { 
            setClassName('w3-panel w3-leftbar w3-pale-green w3-large w3-serif')
            setNotification(message)
            setTimeout(()=>{router.replace('/')},1500)
        }
        else {
            setClassName('w3-panel w3-leftbar w3-pale-red w3-large w3-serif')
            setNotification(message)
        }


    }


    return (
        <>
            <Head>
                <title>MS | update</title>
            </Head>
            {
                notification &&
                <div className={className}>
                    <p><i>"{notification}."</i></p>
                </div>
            }
            {
                unitPrice &&
                <form method="post" onSubmit={updateRow} autoComplete="off" className="w3-padding">
                    <p>
                        <span><b>VENDOR</b></span>
                        <input className="w3-input w3-padding-16 w3-border" type="text" required name="vendor" value={vendor} onInput={e => setVendor(e.target.value)} />
                    </p>
                    <p>
                        <span><b>ITEM</b></span>
                        <input className="w3-input w3-padding-16 w3-border" type="text" required name="item" value={item} onInput={e => setItem(e.target.value)} />
                    </p>
                    <p>
                        <span><b>QUANTITY</b></span>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required name="quantity" value={quantity} onInput={e => setQuantity(e.target.value)} />
                    </p>
                    <p>
                        <span><b>UNIT PRICE</b></span>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required name="unit_price" value={unitPrice} onInput={e => setUnitPrice(e.target.value)} />
                    </p>
                    <p>
                        <span><b>TOTAL COST</b></span>
                        <input className="w3-input w3-padding-16 w3-border" type="number" required name="total_cost" value={quantity * unitPrice} onInput={e => setTotalCost(e.target.value)} readOnly />
                    </p>
                    <p><button className="w3-button w3-black w3-block" type="submit">UPDATE</button></p>
                </form>
            }
        </>
    )
}