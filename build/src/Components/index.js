import React from "react";
import AllData from "./alldata";
import CreateAccount from "./createaccount";
import Deposit from "./deposit";
import Login from "./login";
import NavBar from "./navbar";
import Withdraw from "./withdraw";
import Home from "./home";
import Transfer from "./transfer";
import {
    Routes,
    Route,
    Link,
    HashRouter
  } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css';

  

export default function Spa() {
    return (
        <HashRouter>
            <NavBar></NavBar>
   <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/CreateAccount/" element={<CreateAccount />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/deposit/" element={<Deposit />} />
        <Route path="/withdraw/" element={<Withdraw />} />
        <Route path="/alldata/" element={<AllData />} />
        <Route path="/transfer/" element={<Transfer />} />
   </Routes>      
        </HashRouter>

    );
}

