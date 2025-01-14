import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import MyShoppingList from "./pages/myShoppingList/myShoppingList";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/shoppinglist" element={<MyShoppingList />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
