import React, {useState} from "react";
import { Card, CurrentUser } from "./context";
import { Link } from "react-router-dom";
import {Loading} from "./loading"
import '../App.css';

export default function Home(){
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [isUserSet, setIsUserSet] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (currentUser.email === '') {
    Loading();
    setTimeout(() => {
     setLoading(false);
  }, 0);

    } else {
      setLoading(false);
    }
  }, []);
 
    return (
      <>
         {!loading && (
       <Card 
       bgcolor="primary"
       txtcolor="white"
       header="Regan's Bad Bank"
       title={currentUser.name != '' && `Welcome, ${currentUser.name}.`}       
       body={currentUser.name != '' ? (
      <>
       Your current balance is ${currentUser.balance}. You can make a <Link to="/deposit" className="mylink">deposit</Link> or <Link to="/withdraw" className="mylink">withdraw</Link> fake cash!
       </>
       ) : (
       <>
       Please <Link to="/login" className="mylink">log in</Link> or <Link to="/CreateAccount" className="mylink">create an account</Link> to continue.
     </>
       )
      }       
       centered={(<img src={require ('../Images/BadBankLogo.png')} className="img-fluid" alt="Bank Icon" />)}
       
       />
      )}
       </>
    );
}