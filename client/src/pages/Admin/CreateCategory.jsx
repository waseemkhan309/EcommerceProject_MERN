import { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/Form/Categoryform'
import { Modal } from 'antd'


const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    // form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllCattegory()
            } else {
                toast.error("category Created")
            }
        } catch (err) {
            console.log(err)
            toast.error('Something wrong in manage category')
        }
    }

    // get all categories
    const getAllCattegory = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category);
            }
        } catch (err) {
            console.log(err);
            toast.error("Erro in create Category")
        }
    }

    useEffect(() => {
        getAllCattegory();
    }, [])
    // handle update
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`,{name:updatedName})
            if(data){
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCattegory()
            }else{
                toast.error(data.message)
            }
        }catch(err){
                toast.error("Error in update Category")
        }
    }
    // handle del
    const handleDel=async(pId)=>{
        try{
            // eslint-disable-next-line no-unused-vars
            const {data} = await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${pId}`)
            if(data.success){
                toast.success(`category is delete`)
                getAllCattegory()
            }else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error('Error in Delete category')
        }
    }
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <Categoryform
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className='w-75'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> Name </th>
                                        <th scope="col"> Actions </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories?.map((c) => (
                                            <>
                                                <tr>
                                                    <td key={c._id}>{c.name}</td>
                                                    <td>
                                                        <button className='btn btn-success ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c)  }}>Edit</button>
                                                        <button className='btn btn-danger ms-2' onClick={()=>{handleDel(c._id)}}>Del</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <Categoryform value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory