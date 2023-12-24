import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      </Router>
      <Footer />
    </>
  );
}

export default App;
