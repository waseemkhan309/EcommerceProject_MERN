import './App.css'
import Layout from './components/Layout/Layout'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
const App = () => {
  return (
    <>
      <Layout>
        <p>Ecommerce website</p>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/policy" element={<Policy/>}/>
          <Route path="/*" element={<Pagenotfound/>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
