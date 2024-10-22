// import React from 'react'
// import { Link } from 'react-router-dom'

// function Login() {
//   return (
//     <div>
//     <div className='text-center container mx-auto '>
//       <form className='flex flex-col w-[28%] mx-auto mt-[100px] shadow-2xl p-4 px-[30px] rounded-xl'> 
//         <span className='text-5xl text-gray-500 font-bold mb-11'>Login</span>
//         <span className='text-left text-gray-700  mb-1 '> Email</span>
//         <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8' type="email" placeholder='Enter Email'/>
//         <span className='text-left text-gray-700  mb-1 '>Password</span>
//         <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-[40px]' type="password" placeholder='Enter password' /> 
//         <button className='bg-blue-600 text-white py-3 rounded-xl active:scale-95 mb-[25px]'>LOGIN</button>
//         <button className='bg-purple-600 text-white py-3 rounded-xl active:scale-95 mb-[25px]'>GUEST USER</button>
//         <span className='text-[18px]'>Not a member yet?  <Link className='text-blue-700' to={'/register'}>Register</Link></span>
//       </form>
//     </div>
//   </div>
//   )
// }
// export default Login 

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const userData = { identifier: email, password };

      fetch('https://strapi-store-server.onrender.com/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Invalid credentials');
          }
          return response.json();
        })
        .then((result) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('jwt', result.jwt); 
          navigate('/'); 
        })
        .catch((error) => {
          console.error('Login failed:', error);
          setErrors({ general: 'Invalid credentials or server error' });
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='text-center container mx-auto'>
      <form className='flex flex-col w-[28%] mx-auto mt-[100px] shadow-2xl p-4 px-[30px] rounded-xl'>
        <span className='text-5xl text-gray-500 font-bold mb-11'>Login</span>

        <span className='text-left text-gray-700 mb-1'>Email</span>
        <input
          className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8'
          type="email"
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}

        <span className='text-left text-gray-700 mb-1'>Password</span>
        <input
          className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-[40px]'
          type="password"
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
        {errors.general && <span className="text-red-500">{errors.general}</span>}


        <button
          className='bg-blue-600 text-white py-3 rounded-xl active:scale-95 outline-none mb-[25px]'
          onClick={handleLogin}
        >
          LOGIN
        </button>
        <button className='bg-purple-600 text-white py-3 rounded-xl outline-none active:scale-95 mb-[25px]'>GUEST USER</button>
        
        <span className='text-[18px]'>
          Not a member yet?{' '}
          <Link className='text-blue-700' to={'/register'}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;

