import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div>
      <div className='text-center container mx-auto '>
        <form className='flex flex-col w-[28%] mx-auto mt-[100px] shadow-2xl p-4 px-[30px] rounded-xl'> 
          <span className='text-5xl text-gray-500 font-bold mb-11'>Register</span>
          <span className='text-left text-gray-700  mb-1 '> Username</span>
          <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8 ' type="text" placeholder='Enter Username' />
          <span className='text-left text-gray-700  mb-1 '> Email</span>
          <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8' type="email" placeholder='Enter Email'/>
          <span className='text-left text-gray-700  mb-1 '>Password</span>
          <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-[40px]' type="password" placeholder='Enter password' /> 
          <button className='bg-blue-600 text-white py-3 rounded-xl active:scale-95 mb-[25px]'>REGISTER</button>
          <span className='text-[18px]'>Already a member?  <Link className='text-blue-700' to={'/login'}>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Register