import React, {useState} from "react";
import { Card, CurrentUser } from "./context";
import { Link } from "react-router-dom";
import '../App.css';
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

export default function Home(){
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [isUserSet, setIsUserSet] = useState(false);


  const firebaseConfig = {
    apiKey: "AIzaSyDhKNCusOPW2y52bMwLnOrXIy-u1y1Q4KI",
    authDomain: "bank-f0c47.firebaseapp.com",
    projectId: "bank-f0c47",
    storageBucket: "bank-f0c47.appspot.com",
    messagingSenderId: "710670974978",
    appId: "1:710670974978:web:b724e76530555264b8271b"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  console.log(JSON.stringify(auth));
  if (!auth.email) {
    setCurrentUser({
        name: '',
        email: '',
        balance: 0,
        password: '',
        role: 'none'
       });
       setIsUserSet(false);
  } else {
    console.log(`current user should be: ${auth.name}`)
    setIsUserSet(true);
  }
  async function getBalance(email) {
    const url = `/account/balance/${email}`;
    var res = await fetch(url);
    var data = await res.json();
  setCurrentUser(user => ({
    ...user,
    balance: data.balance
  }));     
}

  // const authorizationURL = `/account/authorization/`;
  //   async function reviewAuthorization() {
  //      var res = await fetch(authorizationURL);
  //      if (res.ok) {
  //      let user = await res.json();
  //      if (!user.email) {
  //       setCurrentUser({
  //           name: '',
  //           email: '',
  //           balance: 0,
  //           password: '',
  //           role: 'none'
  //          });
  //          setIsUserSet(false);
  //     } else {
  //       setCurrentUser(user);
  //       setIsUserSet(true);
  //     }
  //     }; 
    // }
    //   React.useEffect(() => {
    //     if (currentUser.email === '') {
    //     reviewAuthorization();
    //     } else {
    //       setIsUserSet(true);
    //     }
    //   }, []);

      React.useEffect(() => {
        if (isUserSet && currentUser.email) {
        getBalance(currentUser.email);
        }
      }, [isUserSet]);

    return (
       <Card 
       bgcolor="primary"
       txtcolor="white"
       header="Regan's Bad Bank"
       title={currentUser.name != '' ? `Welcome, ${currentUser.name}.` : ''}       
       body={currentUser.name != '' ? (
      <>
       Your current balance is ${currentUser.balance}. You can <Link to="/deposit" className="mylink">make a deposit</Link> or <Link to="/withdraw" className="mylink">withdraw fake cash</Link>!
       </>
       ) : (
       <>
       Please <Link to="/login" className="mylink">log in</Link> or <Link to="/CreateAccount" className="mylink">create an account</Link> to continue.
     </>
       )
      }       
       centered={(<img src={require ('../Images/BadBankLogo.png')} className="img-fluid" alt="Bank Icon" />)}
       
       />
    );
}