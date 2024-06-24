import React from "react";
import { useLocation } from 'react-router-dom';
import { CurrentUser } from "./context";

export default function NavBar({}){

  const { currentUser } = React.useContext(CurrentUser);

  const location = useLocation();
  const { pathname } = location;
  let selected = `#${pathname}`

    if (currentUser.name) {
    return (
        <>
        
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
  <a className="navbar-brand" aria-current={selected === "#/" ? "page" : undefined} href="#" data-container="body" data-toggle="popover" data-placement="bottom" title="Home" data-trigger="hover focus">
       <img src={require('../Images/BadBankLogo.png')} className="img-navbar" alt="Bank Logo" />
     </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className={selected === "#/deposit/" ? "nav-item active" : "nav-item"}>
                <a 
                  className="nav-link" aria-current={selected === "#/deposit/" ? "page" : undefined} href="#/deposit/"
                  data-container="body" 
                  data-toggle="popover" 
                  data-placement="bottom" 
                  title="Click here to deposit fake money"
                  data-trigger="hover focus">
                  Deposit
                </a>
              </li>
              <li className={selected === "#/withdraw/" ? "nav-item active" : "nav-item"}>
                <a 
                  className="nav-link" aria-current={selected === "#/withdraw/" ? "page" : undefined} href="#/withdraw/"
                  data-container="body" 
                  data-toggle="popover" 
                  data-placement="bottom" 
                  title="Click here to withdraw fake money"
                  data-trigger="hover focus">
                  Withdraw
                </a>
              </li>
              <li className={selected === "#/transfer/" ? "nav-item active" : "nav-item"}>
                <a 
                  className="nav-link" aria-current={selected === "#/withdraw/" ? "page" : undefined} href="#/transfer/"
                  data-container="body" 
                  data-toggle="popover" 
                  data-placement="bottom" 
                  title="Click here to transfer fake money"
                  data-trigger="hover focus">
                  Transfer
                </a>
              </li>
              <li className={selected === "#/alldata/" ? "nav-item active" : "nav-item"}>
                <a 
                  className="nav-link" aria-current={selected === "#/alldata/" ? "page" : undefined} href="#/alldata/"
                  data-container="body" 
                  data-toggle="popover" 
                  data-placement="bottom" 
                  title="Click here to see all the shady fake data"
                  data-trigger="hover focus">
                  All Data
                </a>
              </li>
            </ul>
        </div>
        <div className="collapse navbar-collapse align-items-center justify-content-center">
       </div>
        <div className="collapse navbar-collapse align-items-center justify-content-end">
      <ul className="navbar-nav">
      <li className={selected === "#/login/" ? "nav-item active" : "nav-item"} >
        <a 
        className="nav-link" aria-current={selected === "#/login/" ? "page" : undefined} href="#/login/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to access your account"
        data-trigger="hover focus" >
        {currentUser.email}</a>
       </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    );
} else {
  return (
    <>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
  <a className="navbar-brand" aria-current={selected === "#/" ? "page" : undefined} href="#" data-container="body" data-toggle="popover" data-placement="bottom" title="Home" data-trigger="hover focus">
       <img src={require('../Images/BadBankLogo.png')} className="img-navbar" alt="Bank Logo" />
     </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse align-items-center justify-content-center">
       </div>
        <div className="collapse navbar-collapse align-items-center justify-content-end">
        <ul className="navbar-nav">
      <li className={selected === "#/login/" ? "nav-item active" : "nav-item"} >
    <a 
    className="nav-link" aria-current={selected === "#/login/" ? "page" : undefined} href="#/login/"
    data-container="body" 
    data-toggle="popover" 
    data-placement="bottom" 
    title="Click here to log in to your account"
    data-trigger="hover focus" >
    Log In</a>
   </li>
   <li className={selected === "#/CreateAccount/" ? "nav-item active" : "nav-item"}>
    <a 
    className="nav-link" aria-current={selected === "#/CreateAccount/" ? "page" : undefined} href="#/CreateAccount/"
    data-container="body" 
    data-toggle="popover" 
    data-placement="bottom" 
    title="Click here to create an account"
    data-trigger="hover focus" >
    Create Account</a>
    </li>
  </ul>
    </div>
  </div>
</nav>

</>
    );
}
}


