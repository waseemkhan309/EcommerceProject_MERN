// import React from 'react'

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
        <div className="bg-dark text-light p-3">
          <h4 className="text-center">All Right Reserved &copy; Wk</h4>
          <div className="text-center">
          <Link to='/about' className="p-2 text-decoration-none ">About</Link>  |
          <Link to='/contact'  className="p-2 text-decoration-none">Contact</Link>  |
          <Link to='/policy' className="p-2 text-decoration-none">Policy</Link>
          </div>
        </div>
    </>
  )
}

export default Footer
