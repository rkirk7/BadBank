import React from "react";
import { Card, CurrentUser, UserContext, AllActivity } from "./context";


export default function Login(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);
    const allActivity = React.useContext(AllActivity);
    const [status, setStatus] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(currentUser);
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

    function logIn(){
        if(!validate(email, 'Invalid Email')) return;
        if(!validate(password, 'Invalid Password')) return;
        let success = false;
        ctx.forEach(user => {
           if (user.email == email && user.password == password) {
            setLoggedIn({loggedin:true, user:email});
            success = true;
            currentUser.key = user.key
            currentUser.loggedin = true;
            currentUser.email = email;
            currentUser.name = user.name;
            currentUser.balance = user.balance;
            let date = new Date();
        allActivity.push({key:allActivity.length, userID:user.key, name:user.name, activity: `${user.name} logged in`, balance:user.balance, time:date})

           }  
        });
        if (!success) {
            alert('Error: Your email or password were incorrect. Please try again, or create a new account.');
        }
    }

    function logOut(){
        let date = new Date();
        allActivity.push({key:allActivity.length, userID:currentUser.key, name:currentUser.name, activity: `${currentUser.name} logged out`, balance:currentUser.balance, time:date})

            currentUser.loggedin = false;
            currentUser.email = '';
            currentUser.name = '';
            currentUser.balance = 0;
            setLoggedIn({key:null, loggedin: false, email:'', name:'', balance:0}); 
            
    }

    React.useEffect(() =>{
        setFormFilled(email != '' && password != ''); 
    }, [email, password])

    return (
        <Card 
        bgcolor="info"
        header="Log In"
        status={status}
        body={loggedIn.loggedin == false ? (
            <>
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={logIn} disabled={!formFilled}>Log In</button> <br />
        </>
        ) : (
            <>
            <h5>Success</h5>
            <p>You are logged in as {currentUser.name}.</p>
            <button type="submit" className="btn btn-light" onClick={logOut}>Log Out</button> <br />

            </>
        )}
        />
    );
}