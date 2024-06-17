import React from "react";
import { Card, CurrentUser, AllActivity } from "./context";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';


export default function Home(){
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);

    if (currentUser.email) {
    const url = `/account/balance/${currentUser.email}`;

    React.useEffect(() => {
        getBalance();
      }, []);
    
      async function getBalance() {
        var res = await fetch(url);
        var data = await res.json();
      setCurrentUser(user => ({
        ...user,
        balance: data.balance
      }));     
    }
    }

    return (
       <Card 
       bgcolor="primary"
       txtcolor="white"
       header="Regan's Bad Bank"
       title={currentUser.name != '' ? `Welcome, ${currentUser.name}.` : ''}       
       body={currentUser.name != '' ? `Your current balance is $${currentUser.balance}. You can make a deposit or withdraw fake cash!` : 
       <>
       Please <Link to="/login" className="mylink">log in</Link> or <Link to="/CreateAccount" className="mylink">create an account</Link> to continue.
     </>
      }       
       centered={(<img src={require ('../Images/badbanklogo.png')} className="img-fluid" alt="Bank Icon" />)}
       
       />
    );
}