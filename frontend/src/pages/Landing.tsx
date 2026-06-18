import Faq from '../layouts/Faq'
import Features from '../layouts/Features'
import Hero from '../layouts/Hero'
import Navbar from '../layouts/Navbar'
import Product from '../layouts/Product'

const Landing = () => {
  return (
    <>
   <div className='relative min-h-screen'>
     <Navbar/>
    <Hero/>
    <Product/>
    <Features/>
    <Faq/>
   </div>
    </>
  )
}

export default Landing