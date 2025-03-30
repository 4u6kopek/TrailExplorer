import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public routes
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

// Private routes
import CreateTrail from "./components/CreateTrail/CreateTrail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import TrailDetails from "./components/TrailDetails/TrailDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/create-trail"
          element={
            <PrivateRoute>
              <CreateTrail />
            </PrivateRoute>
          }
        />
        <Route
          path="/trail/:id"
          element={
            <PrivateRoute>
              <TrailDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
