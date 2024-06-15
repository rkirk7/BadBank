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

    function handleFirebaseCreate() {
        if(!validate(name, 'name')) {
            alert('Name is a required field.')
            return;
        }
        if(!validate(email, 'email')) {
            alert('email is a required field.')
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                alert("Your email address is not formatted correctly.")
                return;
        }
        if(!validate(password, 'password')) {
            alert('Password is a required field.')
            return;
        }
        if(password.length<8) {
            alert('Your password must be at least eight characters.')
            return;
        }

             const url = `/account/createfirebase/${name}/${email}/${password}`;
             (async () => {
                var res = await fetch(url);
               
                setCurrentUser(user => ({
                 email: email,
                 name: name,
                 balance: 0
               }));
              
               setTimeout(() => {
                 navigate('/');
             }, 0);

        setShow(false);
             })();
    }

    function handleCreate() {
        if(!validate(name, 'name')) {
            alert('Name is a required field.')
            return;
        }
        if(!validate(email, 'email')) {
            alert('email is a required field.')
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                alert("Your email address is not formatted correctly.")
                return;
        }
        if(!validate(password, 'password')) {
            alert('Password is a required field.')
            return;
        }
        if(password.length<8) {
            alert('Your password must be at least eight characters.')
            return;
        }

             const url = `/account/create/${name}/${email}/${password}`;
             (async () => {
                var res = await fetch(url);
               
                setCurrentUser(user => ({
                 email: email,
                 name: name,
                 balance: 0
               }));
              
               setTimeout(() => {
                 navigate('/');
             }, 0);

        setShow(false);
             })();
     }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setFormFilled(false);
        setShow(true);
    }


    React.useEffect(() =>{
        setFormFilled(name != '' && email != '' && password != ''); 
    }, [name, email, password])

    return (
        <Card 
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? (
            <>
            Name<br/>
            <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /> <br />
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
            Password (at least 8 characters)<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
            <button id="submit" type="submit" className="btn btn-light" onClick={handleFirebaseCreate} disabled={!formFilled}>Create Account</button> <br />
        </>
        ) : (
            <>
            <h5>Success!</h5>
            <p>You are logged in as {currentUser.name}.</p>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Create Another Account</button> <br />
            </>
        )}
        />
    );
}