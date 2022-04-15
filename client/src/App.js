import React from "react"
import Header from "./components/header";
import MainPage from "./pages/mainPage";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import Home from "./pages/home";
import SavedJobsPage from "./pages/savedJobs";
import About from "./pages/about";



import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>


      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/savedJobs" element={<SavedJobsPage />} />
      </Routes>



    </Router>
  )
}

export default App