import '../styles/w3.css'
import '../styles/globals.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='w3-content' style={{ maxWidth: '1500px' }} >
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
