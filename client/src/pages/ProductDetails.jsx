/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {
    const [detail, setDetail] = useState({})
    const params = useParams()
    const getproductdetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`)
            // console.log(data?.products.name)
            setDetail(data?.products)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if(params?.slug){
            getproductdetail()
        }
    }, [params?.slug])

    return (
        <Layout>
            <h1 className='m-5'>Product Details</h1>
            <div className="row m-4 border p-5 ">
                <div className="col-md-4">
                    <img src={`http://localhost:5000/api/v1/product/get-photo/${detail._id}`} alt="img" />
                </div>
                <div className="col-md-8">
                    <h3>Name: <i>{detail.name}</i> </h3>
                    <p><h5>Description:</h5> {detail.description}</p>
                    <h3>Price: $ {detail.price}</h3>
                    {/* <h3>Quantity:  {detail.quantity}</h3> */}
                    {/* <h5>Total Price : $ {(detail.price)*(detail.quantity)}</h5> */}
                    <div className='mt-5'>
                        <button className='btn btn-outline-info'>Add to card</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails