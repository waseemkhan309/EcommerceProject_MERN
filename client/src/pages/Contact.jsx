// import React from 'react'
import Layout from "../components/Layout/Layout"
import {BiMailSend,BiPhone,BiSupport} from 'react-icons/bi'

const Contact = () => {
  return (
    <>
    <Layout title={'Contact us - Ecommerce website'}>
        <div className="row g-0 pt-5  contactus">
        <div className="col-md-6 px-5 ">
          <img src="/public/images/contactus.jpeg" alt="contactus" style={{width:'100%'}} />
        </div>
        <div className="col-md-4 p-4 ">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-5">For any query and info about Product feel free to call anytime we 24X7 available </p>
          <p className="mt-3">
            <BiMailSend/> : ecommerce780gmail.com
          </p>
          <p className="mt-3">
            <BiPhone/> : 0325 - 1234567
          </p>
          <p className="mt-3">
            <BiSupport/> : 123 - 432 -1234567(Toll free)
          </p>
        </div>

        </div>
    </Layout>
    </>
  )
}

export default Contact
