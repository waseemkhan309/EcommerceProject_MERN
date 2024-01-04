// import React from 'react'

import Layout from "../components/Layout/Layout"

const Policy = () => {
  return (
    <>
      <Layout title={"Privacy Policy - Ecommerce website"}>

        <div className=" pt-5    contactus">
          <div className=" p-5 text-center mb-xl-5  p   ">
            <img src="/public/images/policy.jpg" alt="contactus" className="rounded w-50"  />
          </div>
          <div className="w-75 mx-auto  ">
            <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          
            <p className="my-xl-5 ">When your business collects a customer’s data, you are accessing information that can be used in a harmful manner against the customer.

              For this reason, data privacy laws like the GDPR require that you must have a privacy policy informing customers of what data you are collecting and how you are using it.

              Your online store may collect more data than you and your customers realize. Data is collected when your business:
              <ul className="my-lg-4 ">
                <li>Requires or allows customer registration for access</li>
                <li>Uses live chat</li>
                <li>Receives customer service requests via email</li>
                <li>Connects to a customer’s social media</li>
                <li>Connects to a customer’s social media</li>
                <li>Asks for a customer’s shipping or payment information</li>
              </ul>


              <p>
                Customers directly provide their information to your business in all of these cases. However, data is also collected indirectly through, for example, cookies.

                Customers may not realize the extent to which you indirectly collect their data. Therefore, a privacy policy is a crucial — and sometimes legally required — way to keep them fully informed.</p>

            </p>

          </div>

        </div>
      </Layout>
    </>
  )
}

export default Policy
