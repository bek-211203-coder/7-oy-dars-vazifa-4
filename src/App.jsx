import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Details from "./pages/Details";
import Card from "./pages/Card";
import Checkout from "./pages/Checkout";
import MainLeaute from "./leaute/MainLeaute";

export const CardContext = createContext();
export const ThemeContext = createContext();
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [card, setCard] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(()=>{ 
    if(localStorage.getItem('cart')){
      setCard(JSON.parse( localStorage.getItem('crat')))
    }
  })


  let paran = useLocation()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    } else {
      if (!(paran.pathname.includes('register') || paran.pathname.includes('about') || paran.pathname.includes('crad') || paran.pathname.includes('products') || paran.pathname == ('/'))) {
        navigate('/login');
      }
    }
  }, [navigate])
  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }

  return (
    <div>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <CardContext.Provider value={{ card, setCard }}>
          <Routes>
            <Route
              path="/"
              element={
                <MainLeaute>
                  <Home></Home>
                </MainLeaute>
              }
            ></Route>
            <Route
              path="/about"
              element={
                <MainLeaute>
                  <About></About>
                </MainLeaute>
              }
            ></Route>
            <Route
              path="/products"
              element={
                <MainLeaute>
                  <Products></Products>
                </MainLeaute>
              }
            ></Route>
            <Route
              path="/products/:id"
              element={
                <MainLeaute>
                  <Details></Details>
                </MainLeaute>
              }
            ></Route>
            <Route
              path="/card"
              element={
                <MainLeaute>
                  <Card></Card>
                </MainLeaute>
              }
            ></Route>

            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>

            <Route
              path="/orders"
              element={
                <PrivateRoute isAuth={!!token}>
                  <MainLeaute>
                    <Orders></Orders>
                  </MainLeaute>
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/checkout"
              element={
                <PrivateRoute isAuth={!!token}>
                  <MainLeaute>
                    <Checkout></Checkout>
                  </MainLeaute>
                </PrivateRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
        </CardContext.Provider>

      </ThemeContext.Provider>
    </div>
  );
}

export default App;
