/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  // get user data
  useEffect(()=>{
    const {email,name,phone,address} = auth.user 
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  // form handle
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://localhost:5000/api/v1/auth/profile", { name, email, phone, address });
        if(data?.error){
          toast.error(data?.error)
        }else{
            setAuth({...auth,user: data?.updateUser})
            let ls = localStorage.getItem("auth")
            ls = JSON.parse(ls)
            ls.user = data.updateUser;
            localStorage.setItem("auth",JSON.stringify(ls))
            toast.success("Profile Updated Successfully")
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  }

  return (
    <Layout title={"Dashboard - Profile"}>

      <div className='container-fluid '>
        <div className='row'>
          <div className='col-md-3 mt-3'>
            <UserMenu />
          </div>
          <div className='col-md-9 '>
            <div className="container p-2">
              <h1 className="my-4 text-center">User Profile </h1>
              <form className="w-50 shadow-lg p-2 mb-5  bg-body-tertiary rounded container" onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="exampleInputname" className="form-label">User name</label>
                  <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputname"
                    aria-describedby="emailHelp"
              
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    autoComplete='off'
                    disabled
                  />
                </div>
                <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">Password</label>
              <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                aria-describedby="emailHelp"
                autoComplete='off'
              />
            </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPhone" className="form-label">Phone number</label>
                  <input type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputaddress" className="form-label">Address</label>
                  <input type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control" id="exampleInputaddress"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile