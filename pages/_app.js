import '../styles/globals.css'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>

    </section>

  )
}

export default MyApp
