import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CurrentUser } from "./context";
import { loginFirebase, logout } from "./firebase";

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
        const logOutUrl = `/account/logout/`;

        async function logIn(e) {
            e.preventDefault();
            if(!validate(email, 'Invalid Email')) return;
                    if(!validate(password, 'Invalid Password')) return;
                     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                        alert("Your email address is not formatted correctly.")
                        return;
                     }
                     if(password.length<8) {
                         alert('Your password is incorrect.')
                         return;
                     }
            let res = await loginFirebase(email, password, setCurrentUser);
            if (res === false) {
                alert('There was an error logging in. Please try again.');
            } else {
                alert('Success! You are now logged in.');
                               setTimeout(() => {
                                 navigate('/');
                             }, 0);
            }
        }
    
    async function logOut(){
        var res = await logout();
        if (res === true) {
        setCurrentUser(user => ({
            email: '',
            name: '',
            role: '',
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
            <form>
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={logIn} disabled={!formFilled}>Log In</button> <br />
            </form>
        </>
        ) : (
            <>
            <p>You are logged in as {currentUser.name}. You have access to the site as {currentUser.role === "admin" ? "an admin" : "a customer" }.</p>
            <button type="submit" className="btn btn-light" onClick={logOut}>Log Out</button> <br />
            </>
        )}
        />
    );
}