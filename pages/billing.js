import Head from "next/head";
import easyinvoice from 'easyinvoice';
import autoComplete from "@tarekraafat/autocomplete.js";
import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FaSpinner } from "react-icons/fa"

export default function Billing() {



    const [stock, setStock] = useState(null);
    const [width, setWidth] = useState(null)

    const [id, setId] = useState(null);
    const [item, setItem] = useState(null);
    const [unit, setUnit] = useState(null);
    const [price, setPrice] = useState(null);


    const [qty, setQty] = useState(null);
    const [total, setTotal] = useState(null);

    const [purchase, setPurchase] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [purItem, setPurItem] = useState([])

    const [waiting, setWaiting] = useState(false)

    const data = {
        images: {
            background: "https://imgplaceholder.deta.dev/1240/1754/ffffff"
        },
        sender: {
            company: "Maranchi Solution",
            address: "3331,3rd stage,A/pura",
            zip: "0716645516",
            city: "0715332244",
            country: "armrash1997@gmail.com"
        },
        information: {
            number: "",
            date: "",
            "due-date": ""
        },
        products: [],
        "bottom-notice": "Kindly pay your invoice within 15 days.",
        settings: {
            currency: "",
            "tax-notation": "vat",
            "margin-top": 25,
            "margin-right": 25,
            "margin-left": 25,
            "margin-bottom": 25
        }
    }

    function confAutoComplete(items) {
        const autoCompleteJS = new autoComplete({
            selector: "#item",
            placeHolder: "Search for Item...",
            data: {
                src: items,
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                }
            }
        });
    }

    useEffect(() => {
        fetch('/api/read')
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    setStock(data.filter(dt => dt['quantity'] !== 0))
                    confAutoComplete(data.map(dt => dt['item']))
                    if (window.navigator.userAgentData.mobile) setWidth('270px')
                    else setWidth('370px')
                }
                else throw Error(data['error'])
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [])

    function handler1(event) {
        try {
            const item = event.target.value;
            const obj = stock.filter(obj => obj['item'] == item)[0]
            setId(obj['id'])
            setItem(obj['item'])
            setUnit(parseInt(obj['quantity']))
            setPrice(parseInt(obj['unit_price']))
        } catch (error) {
            console.log(error.message);
        }
    }

    function handler2(event) {
        try {
            const value = event.target.value;
            setQty(parseInt(value))
            setTotal(parseInt(value) * price)
        } catch (error) {
            console.log(error.message);
        }
    }

    function add() {
        try {
            if (purchase.length === 0) throw Error("No item added")
            if (unit < qty) throw Error('Insufficient')
            let st = subTotal;
            st += total;
            setSubTotal(st);

            if (!purItem.includes(item)) purItem.push(item)
            else throw Error("Already added")

            const _ = purchase;
            _.push({ id, item, qty, price, total })
            setPurchase(_)

            document.getElementById('item').value = ''
            document.getElementById('qty').value = ''
        } catch (error) {
            alert(error.message)
        }
    }

    async function Gen() {
        try {
            if (purchase.length === 0) throw Error("No bill found")
            const _ = []
            for (const { id, item, qty, price, total } of purchase) {
                _.push({
                    quantity: qty,
                    description: item,
                    "tax-rate": 0,
                    price: price
                })
            }
            const unix = Date.now()
            data['products'] = _;
            data['information']['number'] = unix.toString()
            data['information']['date'] = new Date(unix).toDateString()
            setWaiting(true)
            const result = await easyinvoice.createInvoice(data)
            easyinvoice.download(`${unix}.pdf`, result.pdf)
            setWaiting(false)
        } catch (error) {
            alert(error.message)
        }
    }

    function delItem(Id, item, total) {
        const _ = purchase;
        const __ = _.filter(({ id }) => id !== Id)
        setPurchase(__);
        const p = purItem;
        const pp = p.filter(e => e !== item)
        setPurItem(pp)
        let s = subTotal;
        s -= total;
        setSubTotal(s)

    }



    return (
        <>
            <Head>
                <title>MS | billing</title>
            </Head>

            <div className="w3-row w3-center">

                {
                    waiting &&
                    <FaSpinner color="red" className="w3-spin" size={32} />
                }

                <div className="w3-padding">
                    <input id="item" className="w3-block" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" onBlur={handler1} />
                    <hr />
                    {
                        width &&
                        <>
                            <input id="qty" type="number" placeholder="Quantity" onInput={handler2} style={{ width: width, height: '40px' }} />
                            <hr />
                            <button onClick={add} className="w3-button w3-gray" style={{ width: width }}>Add</button>
                            <hr />
                            <button onClick={Gen} className="w3-button w3-gray" style={{ width: width }}>Gen</button>
                        </>
                    }
                </div>

            </div>

            <hr />

            {
                subTotal > 0 &&
                <div className="w3-responsive">
                    <table className="w3-table-all">
                        <caption>Total:<b>{subTotal}</b></caption>
                        <thead>
                            <tr >
                                <td>Item</td>
                                <td>Qty</td>
                                <td>Price</td>
                                <td>Total</td>
                                <td className="w3-center">Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                purchase.map(({ id, item, qty, price, total }) =>
                                    <tr key={id}>
                                        <td>{item}</td>
                                        <td>{qty}</td>
                                        <td>{price}</td>
                                        <td>{total}</td>
                                        <td className="w3-center" onClick={() => { delItem(id, item, total) }}><RiDeleteBin2Fill /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            }



        </>
    )
}