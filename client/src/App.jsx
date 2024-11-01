// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/Homepage/BrowseCategories";
import WorkersNearYou from "./pages/WorkersNearYou";
import AddService from "./pages/AddService";
import Dashboard from "./components/serviceProvider/Dashboard";

import RegisterUser from "./components/user/Register";
import RegisterProvider from "./components/serviceProvider/ProviderRegister";
import LoginUser from "./components/user/Login";
import LoginProvider from "./components/serviceProvider/ProviderLogin";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
        <Route path="/ServiceProvider" element={<Dashboard />} />
        <Route
          path="/categories/:categoryName/:city"
          element={<WorkersNearYou />}
        
        />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-provider" element={<LoginProvider />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-provider" element={<RegisterProvider />} />
        <Route path="/addService" element={<AddService />} />
        
      </Routes>
    </Router>
  );
};

export default App;
