import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home takes full width */}
        <Route path="/" element={<Home />} />

        {/* Other pages stay inside container */}
        <Route
          path="/menu"
          element={
            <div className="container">
              <Menu />
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="container">
              <Contact />
            </div>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;