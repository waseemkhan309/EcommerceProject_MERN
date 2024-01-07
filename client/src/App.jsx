import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Registerr from './pages/Auth/Registerr'
import Loginn from './pages/Auth/Loginn'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registerr />} />

        <Route path='/dashboard'  element={<PrivateRoute />}>
          <Route path=''  element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<Loginn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App
