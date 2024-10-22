import React, { useEffect, useState } from 'react'
import { http } from '../axios'
import { useNavigate } from 'react-router-dom'



function Products() { 

  const [produc, setProduc] = useState([]) 

  useEffect(()=>{
    http.get('products')
        .then(data => {
          console.log(data.data.data);
          if(data.status == 200){
            setProduc(data.data.data)
          }
        })
        .catch(err => {
          console.log(err);
          
        })
  },[]) 

  const navigatee = useNavigate();
    function handelRedir(id) {
        if(id){
            navigatee(`/products/${id}`)
        } else {
            console.log('product id not found ')
        }
    }
  return (
    <div className='container mx-auto p-[100px]'>
      <div className=' bg-blue-100 p-6 mt-[-90px] mb-[50px] rounded-md '>
        <form className='flex gap-10 justify-center items-center '>
          
          
          <input  className='w-1/5 rounded-xl p-2 border-[1.5px] border-gray-300  outline-gray-300 outline-[2.5px]' type="text" placeholder='Search Product '/>
          <select className='w-1/5 rounded-xl p-2'>
            <option value="all">all</option>
            <option value="Tabels">Tabels</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
          <select className='w-1/5 rounded-xl p-2' >
            <option value="all">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="HomesTaed">HomesTaed</option>
          </select>
          <select className='w-1/5 rounded-xl p-2' >
            <option value="all">a-z</option>
            <option value="Tabels">z-a</option>
            <option value="Chairs">high</option>
            <option value="Kids">low</option>
          </select>
   
        </form>
      </div>

      <span className='text-xl text-gray-700  font-bold '>Products</span>
      <hr className='mb-[40px] mt-2' />
      <div className='flex flex-wrap gap-4 items-center justify-center '  >
        {
          produc.length > 0 && produc.map(function(produc,index){
            return(
              <div key={index} className='text-center rounded-xl shadow-xl p-5  hover:shadow-2xl cursor-pointer ' onClick={() => {handelRedir(produc.id)}}>
                <img className='w-[300px] h-[250px] rounded-xl' src={produc.attributes.image} width={300}   alt="" />
                <h3 className='text-xl mt-2 font-semibold text-gray-500 mb-1'>{produc.attributes.title}</h3>
                <h3 className='text-xl  text-blue-950 '>${produc.attributes.price}</h3>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products