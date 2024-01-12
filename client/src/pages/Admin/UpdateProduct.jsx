import { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom';
import { Select } from 'antd'
const { Option } = Select

const UpdateProduct = () => {

    const navigate = useNavigate()
    const params= useParams()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [quantity, setQuantity] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [shipping, setShipping] = useState("")
    const [id,setId] = useState("")

    // get single product
    const getSingleProduct=async()=>{
        try{
            const {data} = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`)
            setName(data.products.name)
            setId(data.products._id)
            setDescription(data.products.description)
            setPrice(data.products.price)
            setQuantity(data.products.quantity)
            setCategory(data.products.category._id)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getSingleProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            photo && productData.append("photo", photo);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);


            const { data } = axios.put(`http://localhost:5000/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.error(data?.message)
            } else {
                toast.success("Product updated Successfully")
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
                <div className='row '>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className='p-3' > Update Product </h1>
                        <div className='m-1 '>
                            <Select
                                placeholder='Select a Category'
                                size='large'
                                showSearch
                                className='form-slect w-50  mb-3'
                                onChange={(value) => { setCategory(value) }}  
                                value={category}
                                >
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
                                {photo ? (
                                    <div className="text-center ">
                                        <img src={URL.createObjectURL(photo)} alt="productphoto" height={"200px"} className='img img-responsive ' />
                                    </div>
                                ):(
                                    <div className="text-center ">
                                        <img src={`http://localhost:5000/api/v1/product/get-photo/${id}`}  alt="productphoto" height={"200px"} className='img img-responsive ' />
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
                                    value={shipping ? "Yes" : "No"}
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}>
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct