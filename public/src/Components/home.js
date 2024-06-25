import React, {useState} from "react";
import { Card, CurrentUser } from "./context";
import { Link } from "react-router-dom";
import '../App.css';

export default function Home(){
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [isUserSet, setIsUserSet] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getBalance(email) {
    const url = `/account/balance/${email}`;
    var res = await fetch(url);
    var data = await res.json();
  setCurrentUser(user => ({
    ...user,
    balance: data.balance
  }));
  setLoading(false);     
}

  const authorizationURL = `/authorization/`;

    async function reviewAuthorization() {
       var res = await fetch(authorizationURL);
       if (res.ok) {
       let user = await res.json();
       if (!user.email) {
        setCurrentUser({
            name: '',
            email: '',
            balance: 0,
            password: '',
            role: 'none'
           });
           setIsUserSet(false);
           setLoading(false);
      } else {
        setCurrentUser(user);
        setIsUserSet(true);
      }
      } else {
        setCurrentUser({
          name: '',
          email: '',
          balance: 0,
          password: '',
          role: 'none'
         });
         setIsUserSet(false);
      }
    }
      React.useEffect(() => {
        if (currentUser.email === '') {
        reviewAuthorization();
        } else {
          setIsUserSet(true);
        }
      }, []);

      React.useEffect(() => {
        if (isUserSet && currentUser.email) {
        getBalance(currentUser.email);
        }
      }, [isUserSet]);

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