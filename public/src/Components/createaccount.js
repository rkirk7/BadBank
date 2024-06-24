import React from "react";
import { CurrentUser, Card} from "./context";
import { useNavigate } from "react-router-dom";

export default function CreateAccount(){

    const navigate = useNavigate();
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(false);
    const [formFilled, setFormFilled] = React.useState(true);
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000); 
            return false;
        }
        return true;
    }

    async function handleCreate() {
        let requestedRole = 'user';
        if(!validate(name, 'name')) {
            alert('Name is a required field.')
            return;
        }
        if(!validate(email, 'email')) {
            alert('email is a required field.')
            return;
        } 
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                alert("Your email address is not formatted correctly.")
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
            alert('Your password is incorrect.')
            return;
        }

             const url = `/account/createaccount/`;

            try {
                var res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password, requestedRole }),
                }
                );

                const newUser = await res.json();
                console.log(JSON.stringify(res));

                if (newUser === true) {
                    alert ("An account already exists for this email. Please log in.")
                    return;
                } else {

             if (role) {
                        requestedRole = 'requestedAdmin';
                        alert('You have requested administrative access to the website. For now, you will have user access until the bank administrator can review your request.')
                    }

            setCurrentUser({
                email: email,
                name: name,
                balance: 0,
                role: requestedRole
              });
              setShow(false);
              alert("Account created! You are now logged in.");
              navigate("/");
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
            <button id="submit" type="submit" className="btn btn-light" onClick={handleCreate} disabled={!formFilled}>Create Account</button> <br />
        </>
        }
        />
    );
}