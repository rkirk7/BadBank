import React from "react";
import { CurrentUser, Card} from "./context";
import { useNavigate } from "react-router-dom";
import { createFirebase } from "./firebase";

export default function CreateAccount(){

    const navigate = useNavigate();
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(false);
    const [formFilled, setFormFilled] = React.useState(true);
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [persistence, setPersistence] = React.useState(false);


    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000); 
            return false;
        }
        return true;
    }

    async function handleCreate(e) {
        e.preventDefault();
        let requestedRole = 'user';
        if(!validate(name, 'name')) {
            alert('Name is a required field.')
            return;
        }
        if(!validate(email, 'email')) {
            alert('email is a required field.')
            return;
        } 
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            alert("Your email address is not formatted correctly.");
            return;
        }
        
        let result = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(name);
        if (!result) {
            alert('Please enter a valid, full name.')
            return;
        }
        if(!validate(password, 'password')) {
            alert('Password is a required field.')
            return;
        }
        if(password.length<8) {
            alert('Your password must have at least eight characters.')
            return;
        }
            try {
                if (role) {
                    requestedRole = 'requestedAdmin';
                    alert('You have requested administrative access to the website. For now, you will have user access until the bank administrator can review your request.')
                }
                let res = await createFirebase(name, email.toLowerCase, password, persistence, requestedRole, setCurrentUser);
                if (res === 'Error') {
                    alert('Error: There was an error creating your account. Please try again.');
                    return;
                } else if (res === 'Account exists') {
                    alert('An account for this email address already exists. Please log in.');
                } else if (res === 'Account created') {
                    alert('Success! Your account has been created and you are now logged in.');
                                   setTimeout(() => {
                                     navigate('/');
                                 }, 0);
                } else {
                    alert('There was an error creating your account. Please try again.');
                }
    } catch (err) {
        alert('Error: There was an error creating your account. Please try again.');
        throw(err);
    }
}

    React.useEffect(() =>{
        setFormFilled(name != '' && email != '' && password != ''); 
    }, [name, email, password])

    return (
        <Card 
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={
            <>
            <form>
            Name<br/>
            <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /> <br />
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
            Password (at least 8 characters)<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
            <input type="checkbox" className="form-check-input" id="checkbox" checked={role} onChange={e => setRole(e.currentTarget.checked)}/>
        <label htmlFor="checkbox" className="form-check-label">
          Request administrative access
        </label><br /><br />
        <input type="checkbox" className="form-check-input" id="persistencecheck" checked={persistence} onChange={e => setPersistence(e.currentTarget.checked)}/>
        <label htmlFor="checkbox" className="form-check-label">
          Remember Me
        </label><br /><br />
            <button id="submit" type="submit" className="btn btn-light" onClick={handleCreate} disabled={!formFilled}>Create Account</button> <br />
            </form>
        </>
        }
        />
    );
}