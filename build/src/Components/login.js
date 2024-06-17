import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CurrentUser, AllActivity } from "./context";

export default function Login(){
    const { currentUser, setCurrentUser} = React.useContext(CurrentUser);
    const navigate = useNavigate();
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [formFilled, setFormFilled] = React.useState(true);


    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000); 
            return false;
        }
        return true;
    }
    
    const url = `/account/loginfirebase/${email}/${password}`;
    const logOutUrl = `/account/logout/`;
    
    async function logIn(){
        if(!validate(email, 'Invalid Email')) return;
        if(!validate(password, 'Invalid Password')) return;
        let success = false;

        var res = await fetch(url);

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
             alert('Error: No account found for that email. Please try again, or create a new account.');
             return;  
         }

         var data = await res.json();

         if (email === data.email) {
             success = true;
             setCurrentUser(user => ({
                 email: email,
                 name: data.name,
                 balance: data.balance,
                 role: data.role
               }));  
 
               alert('Success! You are now logged in.');
               setTimeout(() => {
                 navigate('/');
             }, 0);
         }

     //       let date = new Date();
     //   allActivity.push({key:allActivity.length, userID:user.key, name:user.name, activity: `${user.name} logged in`, balance:user.balance, time:date})

        if (!success) {
            alert('Error: Your email or password were incorrect. Please try again.');
        }
    }

    async function logOut(){
        var res = await fetch(logOutUrl);
        if (res) {
        setCurrentUser(user => ({
            email: '',
            name: '',
            balance: 0
          }));  
          setTimeout(() => {
            navigate('/login');
        }, 0);
    } else {
        alert('There was a problem logging out. Please try again.')
    }
    }

    React.useEffect(() =>{
        setFormFilled(email != '' && password != ''); 
    }, [email, password])

    return (
        <Card 
        bgcolor="info"
        header={(!currentUser.name) ? "Log In" :"Logged In"}
        status={status}
        body={(!currentUser.name) ? (
            <>
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={logIn} disabled={!formFilled}>Log In</button> <br />
        </>
        ) : (
            <>
            <h5>Success!</h5>
            <p>You are logged in as {currentUser.name}. You have access to the site as a(n) {currentUser.role}.</p>
            <button type="submit" className="btn btn-light" onClick={logOut}>Log Out</button> <br />

            </>
        )}
        />
    );
}