/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate, Link } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'


const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const removeCartItem = (pid) => {
        try {
            let mycart = [...cart]
            let index = mycart.findIndex(item => item._id === pid)
            mycart.splice(index, 1)
            setCart(mycart)
            localStorage.setItem('cart', JSON.stringify(mycart))
        } catch (err) {
            console.log(err)
        }
    }

    // total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = parseInt(total) + parseInt(item.price);
            })
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            });
        } catch (err) {
            console.log(err)
        }
    }
    // get payment  gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/product/brainetree/token')
            setClientToken(data?.clientToken)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])

    // handle payment
    const handleCartPayment = async () => {
        try {
            setLoading(true)
            const { nonce } = instance.requestPaymentMethod();
            const { data } = await axios.post('http://localhost:5000/api/v1/product/braintree/payment', {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/order')
            toast.success("Payment Completed Successfully")
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    };
    return (
        <Layout title={'Cart -Ecommerce website'}>
            <div className="row container-fluid mt-2 ">
                <div className="col-md-12">
                    <h1 className=' bg-body-secondary p-2'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length > 0 ?
                            `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"}`
                            : "Your cart is Empty"}
                    </h4>
                </div>
            </div>
            <div className='row container'>
                <div className="col-md-6">
                    {
                        cart?.map(p => (
                            <div className="row card flex-row m-2 container-fluid" key={p._id}>
                                <div className="col-md-4 mt-3" >
                                    <img className="card-img-top object-cover w-50" height={"100px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                                </div>
                                <div className="col-md-8">
                                    <h5>{p.name}</h5>
                                    <span>{p.description.substring(0, 20)}...</span>
                                    <span className='d-block'> Price: $ {p.price}</span>
                                    <button className='btn btn-danger m-2' onClick={() => removeCartItem(p._id)}>Remove </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-6 ">
                    <h2 className='text-center'>Cart Summary</h2>
                    <p className='text-center'>Total | Checkout | Payment</p>
                    <hr />
                    <h5 className='text-center'>Total : {totalPrice()} </h5>
                    <div className="m-3">
                        <h5 className='d-inline-block '>Current Address : </h5>
                        <span> {auth?.token ? auth?.user?.address : " Login for further process Proceess"} .</span>
                        <span className='d-block'>Update address?  <Link to='/dashboard/user/profile'>Click here</Link></span>
                    </div>
                    <div className="mt-2">
                        {
                            !clientToken || !cart?.length ? ("") : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                        }}
                                        onInstance={instance => setInstance(instance)}
                                    />
                                    <button className='btn btn-primary'
                                        onClick={handleCartPayment}
                                        // disabled={!loading || !instance || !auth?.user?.address}
                                    >
                                        {/* {loading ? "Loading..." : "Make Payment"} */}
                                        Make Payment
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default CartPage