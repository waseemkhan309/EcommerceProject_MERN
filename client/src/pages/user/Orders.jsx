/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import moment from 'moment'
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
            {/* <div>{JSON.stringify(orders)}</div> */}

            {
              orders.map((o, i) => {
                return (
                  <div key={i + 1} className='container'>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td scope="row">{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyers?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className=' w-75' >
                      {
                        o?.products.map((p, i) => (
                          <div className="row card flex-row  container-fluid" key={p._id}>
                            <div className="col-md-6 mt-2 " >
                              <img className="card-img-top object-cover w-50" height={"150px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                            </div>
                            <div className="col-md-6 mt-4">
                              <h5>{p.name}</h5>
                              <span>{p.description.substring(0, 20)}...</span>
                              <span className='d-block'> Price: $ {p.price}</span>

                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

    </Layout >
  )
}

export default Orders