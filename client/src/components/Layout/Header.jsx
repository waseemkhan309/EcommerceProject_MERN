// import React from 'react'

import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../../context/auth"
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">  Ecommerce Website</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <SearchInput />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="  navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to='/'  >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  // to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to='/login' >Login</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <div>
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          {auth?.user?.name}
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                              }`}> Dashboard </NavLink>
                          </li>
                          <li>
                            <NavLink onClick={handleLogout} className="dropdown-item" to='/login' >Logout</NavLink>
                          </li>
                        </ul>
                      </li>

                    </div>

                  </>)
              }
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
