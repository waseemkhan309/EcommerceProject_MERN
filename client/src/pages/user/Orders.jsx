/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/orders')
      setOrders(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (auth?.token) {
      getOrders()
    }
  }, [auth?.token])
  return (
    <Layout title={"Dashboard - Orders"}>

      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1>All Products</h1>
            <div>{JSON.stringify(orders)}</div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Orders