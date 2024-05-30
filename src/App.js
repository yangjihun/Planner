import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Sections from "./pages/home/Sections";
import Auction from "./pages/auction/Auction";
import Plan from "./pages/plan/Plan";
import Login from "./pages/login/Login";
import "./App.css";

function App() {
  const [name, setName] = useState('');

  return (
    <Router>
      <div className="App">
        <Header name={name} setName={setName} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Sections name={name} setName={setName} />} />
            <Route path="/auction" element={<Auction setName={setName} />} />
            <Route path="/plan" element={<Plan name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
