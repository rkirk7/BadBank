import React from "react";
import { Card, CurrentUser, UserContext, AllActivity } from "./context";


export default function Deposit(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);
    const allActivity = React.useContext(AllActivity);


    const [deposit, setDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [depositComplete, setDepositComplete] = React.useState(false);


    function makeDeposit() {
        if (isNaN(Number(deposit))) {
            alert('Your deposit must be a valid number.'); 
            return;
        }
        if ((Number(deposit)) <= 0) {
            alert('Your deposit cannot be a negative number.'); 
            return;
        }
        let newBalance = Number(deposit) + Number(balance)
        setBalance(newBalance);
        currentUser.balance = newBalance;
        ctx.forEach(user => {
            if (user.email === currentUser.email) { 
                user.balance = newBalance 
            };
        });
        setDepositComplete(true);
        let date = new Date();
        allActivity.push({key:allActivity.length, userID:currentUser.key, name:currentUser.name, activity: `${currentUser.name} deposited $${deposit}`, balance:newBalance, time:date})
    }
    

    React.useEffect(() =>{
        setFormFilled(deposit != '0' && deposit != ''); 
    }, [deposit])


    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Deposit"
        text={currentUser.name != '' ? `${currentUser.name}, your balance is $${balance}.` : "Please log in or create an account to make a deposit."}       
        title={depositComplete && `You have successfully deposited $${deposit}!`}       
        centered={currentUser.name != '' ? (
            <>
            Deposit Amount<br/>
            <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={makeDeposit} disabled={!formFilled}>Make Deposit</button> <br />
        </>
        ) : (
            <>
            </>
        )}
        />
     );
 }