import React from 'react'
import productImg from "../assets/product.avif"

const Product = () => {
  return (
    <section id='product' className='text-black flex items-center justify-around h-140 '>
      <img className='h-140  ' src={productImg} alt="" />
    <div>
      <h1 className='text-4xl font-semibold'>Your Complete Career Growth Platform</h1>
      <p className='text-3xl mt-4'>Stop switching between resume builders, job trackers, <br /> interview prep tools, and AI chatbots.

Career Copilot brings <br /> everything together in one workspace designed to help you <br /> apply smarter, prepare better, and get hired faster.</p>
    </div>
    </section>
  )
}

export default Product