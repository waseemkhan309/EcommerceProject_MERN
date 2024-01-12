/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/product/get-product");
            setProducts(data.products)
        } catch (err) {
                console.log(err)
            toast.error("Error in Product List")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    // handle delete
    const handleDel=async(id)=>{
        try{
            let answere=window.prompt('Are you sure want to delete this product?')
            if(!answere) return
            const {data} = await axios.delete(`http://localhost:5000/api/v1/product/deleteproduct/${id}`)
            console.log(data)
            toast.success("Product Deleted successfully")
        }catch(err){
            console.log(err)
            toast.error("Error in Product Delete")
        }
    }
    return (
        <>
            <Layout title='Products List - Ecommerce website'>
                <div className='container-fluid'>
                    <div className='row '>
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h1 className='text-center'>All Products Lists</h1>
                            <div className="d-flex ">
                                {
                                    products.map(p => (

                                        <div className="card m-2" style={{ width: '18rem' }} key={p._id}  >
                                            <img className="card-img-top object-cover " height={"200px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-title">{p.description}</p>
                                                <p className="card-text">{p.price}</p>
                                                <p className="card-text">Rating XXXXX</p>
                                            </div>
                                            <div className="mb-3 text-center">
                                                <Link to={`/dashboard/admin/product/${p.slug}`}>
                                                    <button className='btn btn-outline-success'>Update</button>
                                                </Link>
                                                <button className='btn btn-outline-danger ms-2' onClick={() => { handleDel(p._id)} }>Delete</button>
                                            </div>
                                        </div>


                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Products