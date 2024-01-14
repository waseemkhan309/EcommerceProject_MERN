/* eslint-disable no-unused-vars */
import { } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'


const SearchPage = () => {
  const [values, setValues] = useSearch()
  return (
    <>
      <Layout title={'Search results'}>
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap  ">
              {
                values?.results.map((p) => (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}  >
                    <img className="card-img-top object-cover " height={"200px"} src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-title">{p.description.substring(0, 30)}...</p>
                      <p className="card-text">Price: {p.price}</p>
                      <div>
                        <button className="btn btn-outline-secondary" >Add to card</button>
                        <button className="btn btn-outline-secondary ms-1" >More Detail</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default SearchPage