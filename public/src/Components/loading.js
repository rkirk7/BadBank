import React from "react";
import { CurrentUser } from "./context";
import { useNavigate } from "react-router-dom";

export default async function Loading(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);

    const navigate = useNavigate();

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
           setTimeout(() => {
            navigate('/');
        }, 0);
      } else {
        setCurrentUser(user);
      }
      } else {
        setCurrentUser({
          name: '',
          email: '',
          balance: 0,
          password: '',
          role: 'none'
         });
         setTimeout(() => {
            navigate('/');
        }, 0);
      }
    }
      React.useEffect(() => {
        if (currentUser.email === '') {
        reviewAuthorization();
        } else {
            getBalance();
        }
      }, []);
    
      async function getBalance() {
        const url = `/account/balance/${currentUser.email}`;
        var res = await fetch(url);
        var data = await res.json();
        setCurrentUser(user => ({
            ...user,
            balance: parseInt(data.balance)
          })); 
     }

    return;
 }