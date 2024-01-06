// import React from 'react'
import Layout from "../components/Layout/Layout"
import { useAuth } from "../context/auth"

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth()
  return (
    <>
      <Layout title={"Shop Now "}>
        <h1>HOme</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </>
  )
}

export default Home
