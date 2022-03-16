import React from "react"
import Header from "./components/header";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";


import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>


      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>



    </Router>
  )
}

export default App