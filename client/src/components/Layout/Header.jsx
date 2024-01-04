// import React from 'react'

import { NavLink, Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">  Ecommerce Website</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="  navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to='/'  >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" data-toggle="tab" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  category
                </NavLink>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to='/'>Shoes</Link></li>
                  <li><Link className="dropdown-item" to='/'>Cloths</Link></li>
                  <li><Link className="dropdown-item" to='/'>Watch</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/login' >Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to='/cart'>Cart(0)</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
