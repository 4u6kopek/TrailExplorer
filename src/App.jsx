import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public routes
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Adventures from "./components/Adventures/Adventures";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";

// Private routes
import CreateTrail from "./components/CreateTrail/CreateTrail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import TrailDetails from "./components/TrailDetails/TrailDetails";
import Profile from "./components/Profile/Profile";
import EditTrail from "./components/EditTrail/EditTrail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

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
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-trail/:id"
            element={
              <PrivateRoute>
                <EditTrail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
