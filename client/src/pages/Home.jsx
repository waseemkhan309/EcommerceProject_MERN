/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Checkbox, Radio } from 'antd'
import { Price } from "../components/Price"
import { useNavigate } from "react-router-dom"
import { useCart } from '../context/cart'

const Home = () => {
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([])
  const [Categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (page === 1) {
      return
    }
    loadMore()
  }, [page])

  // load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`)
      setProducts([...products, ...data.products])
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  // Filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/product/product-filters', { checked, radio })
      setProducts(data?.products)
    } catch (err) {
      console.log(err)
    }
  }

  // get by cat
  const getAllCattegory = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/category/get-category')
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllCattegory();
    }
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // eslint-disable-next-line 
  }, [checked, radio])

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
    getTotal();
  }, [])


  return (
    <>
      <Layout title={"All Products - Shop Now "}>
        <div className="container w-full">
         <div className="p-5"> 
                <img className="d-block w-100 object-cover" height={"300px"} src="/images/slide1.jpg" alt="First slide" />
              </div> 
        </div>
      
        {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
        <div className="container-fluid row">
          <div className="col-md-2 m-5">
            <div className="d-flex flex-column">
              <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
            <h5 className="mt-4">Filter By Category</h5>
            <div className="d-flex flex-column">
              {
                Categories?.map((c) => (
                  <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                    {c.name}
                  </Checkbox>
                ))
              }
            </div>
            <h5 className=" mt-4">Filter By Price</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {
                  Price?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))
                }
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-9  border-start">
            <h3 className="text-center m-3">All Products</h3>
            <div className="d-flex flex-wrap  ">
              {
                products?.map(p => (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}  >
                    <img className="card-img-top object-cover " height={"200px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-title">{p.description.substring(0, 30)}...</p>
                      <p className="card-text">Price: {p.price}</p>
                      {/* <p className="card-text">Rating: XXXXX</p> */}
                      <div className="">
                        <button className="btn btn-outline-secondary"
                          onClick={() => {
                            setCart([...cart, p])
                            localStorage.setItem("cart", JSON.stringify([...cart, p]))
                            toast.success("Item add to cart")
                          }}
                        >
                          Add to card
                        </button>
                        <button className="btn btn-outline-secondary ms-1" onClick={() => navigate(`/productdetail/${p.slug}`)} >More Detail</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
