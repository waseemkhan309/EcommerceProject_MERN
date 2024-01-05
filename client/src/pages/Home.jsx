// import React from 'react'
import Layout from "../components/Layout/Layout"
import { useAuth } from "../components/Layout/Auth"

const Home = () => {
  const [auth,setAuth] = useAuth()
  return (
    <>
    <Layout title={"Shop Now "}>
     <h1>HOme</h1> 
    <pre>{JSON.stringify(auth)}</pre>
    </Layout>
    </>
  )
}

export default Home
