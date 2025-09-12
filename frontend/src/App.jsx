import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const AddProduct = React.lazy(() => import("../pages/AddProduct"));
const Login = React.lazy(() => import("../pages/Login"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
