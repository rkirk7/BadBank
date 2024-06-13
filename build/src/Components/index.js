import React from "react";
import {AllActivity, CurrentUser, UserContext } from "./context";
import AllData from "./alldata";
import CreateAccount from "./createaccount";
import Deposit from "./deposit";
import Login from "./login";
import NavBar from "./navbar";
import Withdraw from "./withdraw";
import Home from "./home";
import {
    Routes,
    Route,
    Link,
    HashRouter
  } from "react-router-dom";
  

export default function Spa() {
    
    return (
        <HashRouter>
            <NavBar></NavBar>
            <AllActivity.Provider value={[]}>
                <CurrentUser.Provider value={{key:null, loggedin: false, email: '', name: '', balance:0}}>
        <UserContext.Provider value={[{key:1, name:"Regan Kirk", email:"regan@email.com", password:"fakepassword", balance:200}]}>
   <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/CreateAccount/" element={<CreateAccount />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/deposit/" element={<Deposit />} />
        <Route path="/withdraw/" element={<Withdraw />} />
        <Route path="/alldata/" element={<AllData />} />
   </Routes>
     </UserContext.Provider>
     </CurrentUser.Provider>
     </AllActivity.Provider>
      
        </HashRouter>

    );
}

