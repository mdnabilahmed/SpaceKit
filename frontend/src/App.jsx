import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </>
  );
};

export default App;
