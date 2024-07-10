import React from 'react'
import NavBar from '../components/NavBar'
import '../index.css'
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <NavBar />
      <div className="flex hero-section">
        <div class=" py-40 pl-8">
          <div class="text-6xl">Welcome to your event management system</div>
          <p class="py-3 w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            explicabo non similique minus, quod cupiditate assumenda nemo dolore
            ad hic accusamus neque doloribus dolorem impedit laboriosam est odio
            rem a.
          </p>
        </div>
      </div>
      <div className="container">
        <div className='content'>
        <h1>Ready to look around?</h1>
        <div className='m-2 my-9'>
        <button class="py-2 px-5 rounded-2xl">
          Buy
        </button>
        <button class=" py-2 px-5 rounded-2xl">
          Click for more
        </button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home
