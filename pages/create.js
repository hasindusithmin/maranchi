import Head from "next/head";
import { useState } from "react";
import validator from "validator"
import { useRouter } from "next/router";
export default function Create() {

    const router = useRouter();

    const [vendor, setVendor] = useState('')
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unitPrice, setUnitPrice] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    const [notification, setNotification] = useState(null)
    const [className, setClassName] = useState(null)


    async function creatRow(event) {
        event.preventDefault()
        setNotification(null)
        try {
            if (!validator.isAlpha(vendor, ["en-US"], { ignore: " .-," })) throw Error("check if the vendor contains only letters (a-zA-Z0-9).")
            if (!validator.isAlphanumeric(item, ["en-US"], { ignore: " .-," })) throw Error("check if the item contains only letters (a-zA-Z0-9).")
            const row = {
                vendor,
                date: new Date().toDateString(),
                item,
                quantity: parseInt(quantity),
                unit_price: parseInt(unitPrice),
                total_cost: parseInt(totalCost)
            };
            const res = await fetch('/api/createOne', {
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
            if (res.status === 201) {
                setClassName('w3-panel w3-leftbar w3-pale-green w3-large w3-serif')
                setNotification(message)
                setTimeout(() => { router.replace('/') }, 1500)
            }
            else {
                setClassName('w3-panel w3-leftbar w3-pale-red w3-large w3-serif')
                setNotification(message)
            }
        } catch (error) {
            setClassName('w3-panel w3-leftbar w3-pale-red w3-large w3-serif')
            setNotification(error.message)
        }
    }


    return (
        <>
            <Head>
                <title>MS | create</title>
            </Head>
            {
                notification &&
                <div className={className}>
                    <p><i>"{notification}."</i></p>
                </div>
            }

            <form method="post" onSubmit={creatRow} autoComplete="off" className="w3-padding">
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
                <p><button className="w3-button w3-black w3-block" type="submit">ADD</button></p>
            </form>

        </>
    )
}