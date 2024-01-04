import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title,description,keywords,author}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "76vh" }}> {children} </main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title:"Ecommerce website - Shop now ",
  description:"mern stack project",
  keywords:"mern,react,node,mongodb",
  author:"wk"
}

export default Layout
