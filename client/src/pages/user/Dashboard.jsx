import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from '../../context/auth'

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
        <>
          <div className='container-fluid p-3'>
            <div className='row'>
              <div className='col-md-3'>
                <UserMenu/>  
              </div>
              <div className='col-md-9'>
                <div className='card w-75 p-2'>
                  <h3>User_name : {auth?.user?.name}</h3>
                  <h3>Email Name : {auth?.user?.email}</h3>
                  <h3>Phone Name : {auth?.user?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
        </>
    </Layout>
    )
}

export default Dashboard