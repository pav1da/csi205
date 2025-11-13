// react dependencies
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// user components
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import Todos from "./pages/Todos";
import Products from "./pages/Products/Products";
import Carts from "./pages/Cart/Carts";
import ForwardToHome from "./pages/ForwardToHome";
import Login from "./pages/Login";

import { fetchProducts } from "./data/products";

// stylesheets
import "./App.css";

// react function component
function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/todos" element={<Todos />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="/carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
