import React, { useEffect, useState } from 'react'
import { http } from '../axios'
import { useNavigate } from 'react-router-dom';

import image from '../assets/images/foto.webp'
import image2 from '../assets/images/foto_2.webp'

function Home() {
    const [products, setProducts] = useState([]);
    console.log("home page");

    useEffect(() => {
        console.log(1);

        http.get(`products?featured=true`)
            .then((data) => {
                console.log(data);
                if (data.status == 200) {
                    setProducts(data.data.data)
                }
            })
            .catch(err => {
                console.log(err);

            })
    }, [])


    const navigatee = useNavigate();
    function handelRedir(id) {
        if(id){
            navigatee(`/products/${id}`)
        } else {
            console.log('product id not found ')
        }
    }
    return (
        <div className='mt-[70px] p-[100px]'>

            <div className='flex justify-between items-center container mx-auto  mb-20'>
                <div>
                    <h1 className='text-7xl font-bold text-gray-700 w-[600px] mb-[40px]'>We are changing the way people shop</h1>
                    <p className='text-xl   w-[600px] mb-[40px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>
                    <button className='btn btn-info text-white'>OUR PRODUCT</button>
                </div>
                <div className='flex gap-4 w-[500px] h-[450px] bg-blue-950 p-4 rounded-xl'>
                    <img src={image} className=' rounded-xl' alt="" />
                    <img src={image2} className=' w-[40.5%] rounded-s-xl ' alt="" />
                </div>
            </div>
            <h3 className=' container mx-auto text-4xl font-semibold text-gray-600 mt-10 mb-8'>Featured Products</h3>
            <hr className=' container mx-auto  mb-24' />
            <div className='wrapper container mx-auto flex flex-wrap gap-3 justify-center'>
                {
                    products.length > 0 && products.map(function (product, index) {
                        return (
                            
                            <div key={index}  className='grid-cols-3 w-[400px] shadow-xl  rounded-2xl p-3 mb-28 cursor-pointer hover:shadow-2xl' onClick={() => {handelRedir(product.id)}}>
                                <img className='h-[200px] w-full object-cover rounded-2xl  cursor-pointer mb-12 ' src={product.attributes.image} alt="" />
                                <h3 className='text-center font-semibold text-2xl text-gray-700 mb-3'>{product.attributes.title}</h3>
                                <h3 className='text-xl text-center text-blue-800 mb-4'>${product.attributes.price}</h3>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default Home

