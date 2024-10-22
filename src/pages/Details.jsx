// import React, { useContext, useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { http } from "../axios";
// import { space } from "postcss/lib/list";
// import { CardContext } from "../App";
// import { data } from "autoprefixer";

// function Details() {
//   const [product, setProduct] = useState({});
//   const [colors, setColors] = useState("");
//   const [caunt, setCount] = useState(1)
//   const params = useParams();
//   const { id } = params;
//   const {cart, setCart} =useContext(CardContext)

//   useEffect(() => {
//     http
//       .get(`products/${id}`)
//       .then((data) => {
//         if (data.status == 200) {
//           setProduct(data.data.data);
//           setColors(data.data.data.attributes.colors[0]);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   function handleSetCart(e){
//     e.preventDefault();

//     const data ={
//       product: product,
//       colors: colors,
//       caunt: caunt,
//       id: product.id  
//     }

//     setCart([...cart, data])
//     let storage =[]
//     if(localStorage.getItem('cart')){
//       storage = JSON.parse( localStorage.getItem('cart') )

//     }
//     storage.push(product);
//     localStorage.setItem('cart', JSON.stringify(storage))
//   }
//   return (
//     <div>
//       {product.id && (
//         <>
//           <div className="wrapper flex gap-10 container mx-auto">
//             <img src={product.attributes.image} width={400} alt="" />

//             <div>
//               <h3>{product.attributes.title}</h3>
//               <span>{product.attributes.company}</span>
//               <h3>{product.attributes.price}</h3>
//               <p>{product.attributes.description}</p>

//               <div className="flex gap-1">
//                 {product.attributes.colors.length > 0 &&
//                   product.attributes.colors.map((colorProduct , index) => {
//                     return (
//                       <span
//                         key={index}
//                         style={{
//                           backgroundColor: colorProduct,
//                           border:
//                             colors == colorProduct ? "2px solid black" : "none",
//                         }}
//                         className={`block w-3 h-3 rounded-full cursor-pointer`}
//                         onClick={()=> {setColors(colorProduct)}}
//                       ></span>
//                     );
//                   })}
//               </div>
//               <select className="block border border-gray-600 w-48 h-11 rounded-md" value={caunt} onChange={(e)=>{setCount(e.target.value)}} >
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                   <option>4</option>
//                   <option>5</option>
//               </select>
//               <button onClick={handleSetCart} className="border-none rounded-md bg-blue-700 px-4 py-3">ADD TO BAG</button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Details;


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";
import { CardContext } from "../App";

function Details() {
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState("");
  const [caunt, setCount] = useState(1);
  const params = useParams();
  const { id } = params;
  const { cart, setCart } = useContext(CardContext);

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setColors(response.data.data.attributes.colors[0]); // Rangni tanlash
        }
      })
      .catch((err) => {
        console.error("Mahsulotni olishda xatolik:", err);
      });
  }, [id]);

  const handleSetCart = (e) => {
    e.preventDefault();

    const data = {
      product: product,
      colors: colors,
      count: caunt,
      id: product.id,
    };

    // Cartga yangi mahsulot qo'shish
    setCart((prevCart) => [...prevCart, data]);

    // localStorage'ga saqlash
    let storage = [];
    if (localStorage.getItem('cart')) {
      storage = JSON.parse(localStorage.getItem('cart')); // to'g'ri kalit 'cart'
    }
    storage.push(data); // Yangi mahsulot qo'shish
    localStorage.setItem('cart', JSON.stringify(storage));
  };

  return (
    <div>
      {product && product.id ? (
        <div className="wrapper flex gap-[100px] container mx-auto p-[100px]">
          <img className=" rounded-2xl h-[500px] w-[650px]" src={product.attributes.image} alt={product.attributes.title} />
          <div>
            <h3 className="text-gray-500 text-6xl font-bold mb-4">{product.attributes.title}</h3>
            <span className="text-gray-300 text-2xl font-semibold mb-4">{product.attributes.company}</span>
            <h3 className="text-gray-800 text-xl  mt-3 mb-4">${product.attributes.price}</h3>
            <p className="text-gray-800 text-[18px] w-[630px] leading-[35px] mb-[30px]">{product.attributes.description}</p>

            <span className="text-gray-900 text-xl font-medium ">Colors</span>
            <div className="flex gap-3 mt-3">
              {product.attributes.colors.length > 0 &&
                product.attributes.colors.map((colorProduct, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor: colorProduct,
                        border: colors === colorProduct ? "2px solid black" : "none",
                      }}
                      className="block w-6 h-6 rounded-full cursor-pointer  mb-8"
                      onClick={() => setColors(colorProduct)}
                    ></span>
                  );
                })}
            </div>

            <select
              className="block border border-purple-700 outline-none w-48 h-11 rounded-md p-2"
              value={caunt}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

            <button
              onClick={handleSetCart}
              className="border-none rounded-md bg-blue-700 px-4 py-3 mt-3 text-white active:scale-95"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      ) : (
        <p>Mahsulot yuklanmoqda...</p> // Foydalanuvchiga ma'lumot yuklanayotganini ko'rsatish
      )}
    </div>
  );
}

export default Details;
