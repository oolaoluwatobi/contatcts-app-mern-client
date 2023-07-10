import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='mx-5'>
      <h1>Oops!</h1>
      <h1 className='text-4xl font-bold'>Sorry the page you are looking for was not found.</h1>
      <Link className='bg-[#161616] text-white  mt-5 py-2 rounded flex justify-center' to={'/subscribers'}>
        <button className=''>Return to Home</button>
      </Link>
    </div>
  )
}

export default NotFound