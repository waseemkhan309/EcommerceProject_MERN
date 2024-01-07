import { useState } from 'react'
import Layout from "../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaRegIdCard } from "react-icons/fa6";
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Loginn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", { email, password });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        // local storage ****************************************
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(  location.state || "/" );
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
      <Layout title={"Login- Ecommerce website"}>
        <div className="register  ">

          <h1 className="my-4 "> Login <FaRegIdCard /></h1>
          <form className="w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded" onSubmit={handleForm}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
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
                required
              />
            </div>
            <div className='mb-3 '>
              <p><Link className="link-offset-1 text-decoration-none " to='/forgetpassword'>Forget password?</Link></p>

            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </form>

        </div>

      </Layout>
    </>
  )
}

export default Loginn
