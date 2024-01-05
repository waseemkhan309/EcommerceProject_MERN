import { useState } from 'react'
import Layout from "../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from 'axios'
import { FaRegAddressCard } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Registerr = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate();


  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/auth/register`, { name, email, password, phone, address });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  }

  return (
    <>
      <Layout title={"Register - Ecommerce website"}>
        <div className="register  ">
          
          <h1 className="my-4 "> Register User <FaRegAddressCard/></h1>
          <form className="w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded" onSubmit={handleForm}>
            <div className="mb-3">
              <label htmlFor="exampleInputname" className="form-label">User name</label>
              <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputname"
                aria-describedby="emailHelp"
                required
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
                required
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
                required
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
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputaddress" className="form-label">Address</label>
              <input type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control" id="exampleInputaddress"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>

      </Layout>
    </>
  )
}

export default Registerr
