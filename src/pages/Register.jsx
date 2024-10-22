// import React from 'react'
// import { Link } from 'react-router-dom'

// function Register() {
//   return (
//     <div>
//       <div className='text-center container mx-auto '>
//         <form className='flex flex-col w-[28%] mx-auto mt-[100px] shadow-2xl p-4 px-[30px] rounded-xl'> 
//           <span className='text-5xl text-gray-500 font-bold mb-11'>Register</span>
//           <span className='text-left text-gray-700  mb-1 '> Username</span>
//           <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8 ' type="text" placeholder='Enter Username' />
//           <span className='text-left text-gray-700  mb-1 '> Email</span>
//           <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8' type="email" placeholder='Enter Email'/>
//           <span className='text-left text-gray-700  mb-1 '>Password</span>
//           <input className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-[40px]' type="password" placeholder='Enter password' /> 
//           <button className='bg-blue-600 text-white py-3 rounded-xl active:scale-95 mb-[25px]'>REGISTER</button>
//           <span className='text-[18px]'>Already a member?  <Link className='text-blue-700' to={'/login'}>Login</Link></span>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = 'Username is required';
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';
    if (!password) formErrors.password = 'Password is required';
    else if (password.length < 6) formErrors.password = 'Password must be at least 6 characters long';

    return formErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const userData = { username, email, password };

      fetch('https://strapi-store-server.onrender.com/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error during registration');
          }
          return response.json();
        })
        .then((result) => {
          localStorage.setItem('user', JSON.stringify(result.user));

          navigate('/login');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          setErrors({ general: 'Registration failed. Please try again.' });
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='text-center container mx-auto'>
      <form className='flex flex-col w-[28%] mx-auto mt-[100px] shadow-2xl p-4 px-[30px] rounded-xl'>
        <span className='text-5xl text-gray-500 font-bold mb-11'>Register</span>


        <span className='text-left text-gray-700 mb-1'>Username</span>
        <input
          className='border-2 border-gray-500 outline-none px-4 py-3 rounded-xl mb-8'
          type="text"
          placeholder='Enter Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="text-red-500">{errors.username}</span>}
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
          className='bg-blue-600 text-white py-3 rounded-xl active:scale-95 mb-[25px]'
          onClick={handleRegister}
        >
          REGISTER
        </button>
        <span className='text-[18px]'>
          Already a member?{' '}
          <Link className='text-blue-700' to='/login'>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;


