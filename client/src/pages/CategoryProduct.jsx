import { useState, useEffect } from 'react'
import Layout from "../components/Layout/Layout"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {

  const params = useParams();
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (params?.slug) {
      getproductByCat()
    }
  }, [params?.slug])

  const getproductByCat = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-category/${params.slug}`)
      setProduct(data?.products)
      setCategory(data?.category)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout title={'Category - Ecommerce Website'}>
      <div className="col-md-9  border-start">
              <h3 className="text-center m-3"> Category :  {category[0]?.name}</h3>
            <h5 className="text-center m-3">{product?.length}  Result Found</h5>
            <div className="d-flex flex-wrap  ">
              {
                product?.map(p => (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}  >
                    <img className="card-img-top object-cover " height={"200px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-title">{p.description.substring(0, 30)}...</p>
                      <p className="card-text">Price: {p.price}</p>
                      {/* <p className="card-text">Rating: XXXXX</p> */}
                      <div className="">
                        <button className="btn btn-outline-secondary" >Add to card</button>
                        <button className="btn btn-outline-secondary ms-1" onClick={()=> navigate(`/productdetail/${p.slug}`)} >More Detail</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            
          </div>
    </Layout>
  )
}

export default CategoryList