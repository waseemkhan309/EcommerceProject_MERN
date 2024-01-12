
import { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd'
const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")

    // get all categories
    const getAllCattegory = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (err) {
            console.log(err);
            toast.error("Erro in create Category")
        }
    }

    useEffect(() => {
        getAllCattegory();
    }, [])

    // create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            // productData.append("category", category);

            const { data } = axios.post("http://localhost:5000/api/v1/product/create-product", productData);
            if (data?.success) {
                toast.error(data?.message)
            } else {
                toast.success("Product created Successfully")
                navigate("/dashboard/admin/products")
            }
        } catch (err) {
            console.log(err)
            toast.error("Error in create product")
        }

    }

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Create Product</h1>
                        <div className='m-1 '>
                            <Select
                                placeholder='Select a Category'
                                size='large'
                                showSearch
                                className='form-slect w-50  mb-3'
                                onChange={(value) => { setCategory(value) }}  >
                                {
                                    categories?.map(c => (
                                        <Option key={c._id} value={c._id}> {c.name} </Option>
                                    ))
                                }
                            </Select>
                            {/* image */}
                            <div className="mb-3 ">
                                <label className='btn btn-outline-secondary w-50'>
                                    {photo ? photo.name : "Upload photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3 w-50" >
                                {photo && (
                                    <div className="text-center ">
                                        <img src={URL.createObjectURL(photo)} alt="productphoto" height={"200px"} className='img img-responsive ' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type='text'
                                    value={name}
                                    placeholder='Enter your name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea type='text'
                                    value={description}
                                    placeholder='Description about product'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type='number'
                                    value={quantity}
                                    placeholder='Quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type='number'
                                    value={price}
                                    placeholder='Price of product'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder='select shipping'
                                    size='large'
                                    showSearch
                                    className='form-select mb-3 '
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}>
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct