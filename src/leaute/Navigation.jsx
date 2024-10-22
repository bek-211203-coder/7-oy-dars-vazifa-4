// import React, { useContext, useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// import { CardContext } from '../App';


// const Navigation = () => {
//   const { cart, setCart } = useContext(CardContext);
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     let sum = 0;
//     cart.forEach(c => {
//       sum += Number(c.count) 
//     })

//     setCount(sum)
//   }, [cart])
//   return (
//     <div>
//       <nav>

//       </nav>

//       <span className="badge badge-sm indicator-item bg-blue-600">{count}</span>
//     </div>

//   );
// };

// export default Navigation;
import React from 'react'
import { Link } from 'react-router-dom'

function navigation() {
  return (
    <div className='bg-blue-100 p-2 mb-[45px]'>
      <nav className='flex gap-3 justify-center items-center '>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/products'}>Products</Link>
        <Link to={'/card'}>Cart</Link>
      </nav>
    </div>
  )
}

export default navigation
