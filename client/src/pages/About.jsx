// import React from 'react'
import Layout from "../components/Layout/Layout"
const About = () => {
  return (
    <>
      <Layout title={'About us - Ecommerce website'}>
        <div className="row g-0 my-5 contactus">
          <div className="col-md-6 mb-5">
            <img src="/public/images/about.jpeg" alt="about" style={{ width: '100%' }} />
          </div>
          <div className="col-md-4 py-2">
            <p className="text-justify mt-2 p-4 lh-lg">
              We establish our company in 2001 , our main goal to provide every goods at customer door step.
              E-commerce (electronic commerce) is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These e-commerce transactions typically fall within four types: business-to-business (B2B), business-to-consumer (B2C), consumer-to-consumer or consumer-to-business.
              The terms e-commerce and e-business are often used interchangeably. The term e-tail is also sometimes used in reference to the transactional processes that make up online retail shopping.
              In the last two decades, e-commerce platforms -- such as Amazon and eBay -- have contributed to substantial growth in online retail. In 2011, e-commerce accounted for 5% of total retail sales according to the U.S. Census Bureau. By Q2 2020, after the start of the COVID-19 pandemic, e-commerce accounted for 16.5% of retail sales. Since then, it has fallen slightly to about 15% as physical stores reopened.
              Advantages of e-commerce
              The benefits of e-commerce include its availability, accessibility, speed of access, selection of goods and services and international reach.

              Around-the-clock availability. Aside from outages and scheduled maintenance, e-commerce sites are available 24/7, enabling visitors to browse and shop at any time. Brick-and-mortar businesses tend to open for a fixed number of hours and even close entirely on certain days.
              Speed of access.
            </p>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default About
