import React, {useState, useEffect} from "react";
import { Card, CurrentUser } from "./context";
import { Link } from "react-router-dom";
import '../App.css';
import { checkAuthorization, getBalance } from "./firebase";


export default function Home(){
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function loadPage() {
        if (currentUser.email === '') {
          await checkAuthorization(setCurrentUser);
        } 
        else {
            await getBalance(setCurrentUser, currentUser.email);
        }
        setLoading(false);
    }
    loadPage();
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