import React from "react";
import { Card, CurrentUser } from "./context";
import { useNavigate } from "react-router-dom";


export default function Deposit(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [deposit, setDeposit] = React.useState(0);
    const [lastDeposit, setLastDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [depositComplete, setDepositComplete] = React.useState(false);

    const navigate = useNavigate();

    const authorizationURL = `/account/authorization/`;
    async function reviewAuthorization() {
       var res = await fetch(authorizationURL);
       if (res.ok) {
       let user = await res.json();
       if (!user.email) {
           setTimeout(() => {
            navigate('/');
        }, 0);
      }
      }; 
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
        setBalance(parseInt(data.balance));
     }

    function makeDeposit() {
        if (isNaN(Number(deposit))) {
            alert('Your deposit must be a valid number.'); 
            return;
        }
        if ((Number(deposit)) <= 0) {
            alert('Your deposit cannot be a negative number.'); 
            return;
        }
        if (!Number.isInteger(Number(deposit))) {
            alert('Error: You must deposit dollars only, not cents. Please round up or down and try again.'); 
            return;
        }
        let newBalance = parseInt(deposit) + parseInt(balance)

        const url = `/account/updateBalance/${currentUser.email}/${newBalance}/deposit/${parseInt(deposit)}`;
    (async () => {
       var res = await fetch(url);
       setBalance(newBalance);
       setCurrentUser(user => ({
        ...user,
        balance: newBalance
      })); 
        setLastDeposit(deposit);
        setDeposit(0);
        setDepositComplete(true);
    })();
    }
    

    React.useEffect(() =>{
        setFormFilled(deposit != '0' && deposit != ''); 
    }, [deposit])


    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Deposit"
        text={`${currentUser.name}, your balance is $${balance}.`}       
        title={depositComplete && `You have successfully deposited $${lastDeposit}!`}       
        body={
            <>
            Deposit Amount<br/>
            <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => {
                setDeposit(e.currentTarget.value);
                setDepositComplete(false);
                }} /> <br /> 
        </>
        }
        centered={
    <>
            <button type="submit" className="btn btn-light" onClick={makeDeposit} disabled={!formFilled}>Make Deposit</button> <br />
    </>
        }
        />
     );
 }