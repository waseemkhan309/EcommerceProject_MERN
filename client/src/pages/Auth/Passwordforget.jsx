import { useState } from 'react'
import Layout from "../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from 'axios'
// import { Link } from 'react-router-dom';
import { MdPassword } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Passwordforget = () => {

  const [email, setEmail] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [answere, setAnswere] = useState("")
  const navigate = useNavigate();

// form handle function
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgetpassword", { email, newpassword , answere });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate( "/login");
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

          <h1 className="my-4 "> Forget Password <MdPassword  /></h1>
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
              <label htmlFor="exampleInputPassword" className="form-label">New Password</label>
              <input type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">Answere</label>
              <input type="password"
                value={answere}
                onChange={(e) => setAnswere(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Forget password</button>
          </form>

        </div>

      </Layout>
    </>
  )
}

export default Passwordforget
