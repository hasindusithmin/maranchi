import Link from "next/link"
export default function Navbar() {
    return (
        <>

            <div className="w3-row w3-padding w3-dark-gray">
                <div className="w3-col s4">
                    <Link href="/" className="w3-button w3-block">HOME</Link>
                </div>
                <div class="w3-col s4">
                    <Link href="/billing" className="w3-button w3-block">BILL</Link>
                </div>
                <div class="w3-col s4">
                    <Link href="/api/logout" className="w3-button w3-block">LOGOUT</Link>
                </div>
            </div>
            <header className="w3-center w3-margin-bottom">
                <h1 className="w3-opacity"><b>MARANCHI SOLUTION</b></h1>
                <p><b>Stock Dashboard</b></p>
            </header>
        </>
    )
}