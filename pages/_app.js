import '../styles/w3.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <div className='w3-content' style={{maxWidth:'1500px'}} >
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
