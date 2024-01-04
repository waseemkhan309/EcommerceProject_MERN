import Header from './Header'
import Footer from './Footer'

// eslint-disable-next-line react/prop-types
const Layout = ( { children } ) => {
  return (
    <>
      <Header />
        <main style={{minHeight:"80vh"}}> {children} </main>
      <Footer />
    </>
  )
}

export default Layout
