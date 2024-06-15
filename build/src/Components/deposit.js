import React from "react";
import { Card, CurrentUser, AllActivity } from "./context";


export default function Deposit(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  //  const allActivity = React.useContext(AllActivity);

    const [deposit, setDeposit] = React.useState(0);
    const [lastDeposit, setLastDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(4);
    const [formFilled, setFormFilled] = React.useState(true);
    const [depositComplete, setDepositComplete] = React.useState(false);

    const url = `/account/balance/${currentUser.email}`;
    React.useEffect(() => {
        getBalance();
      }, []);
    
      async function getBalance() {
        var res = await fetch(url);
        var data = await res.json();
        setBalance(data.balance);
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
        let newBalance = Number(deposit) + Number(balance)

        const url = `/account/updateBalance/${currentUser.email}/${newBalance}`;
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

      //  let date = new Date();
     //   allActivity.push({key:allActivity.length, userID:currentUser.key, name:currentUser.name, activity: `${currentUser.name} deposited $${deposit}`, balance:newBalance, time:date})
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
        title={depositComplete && `You have successfully deposited $${lastDeposit}!`}       
        centered={currentUser.name != '' ? (
            <>
            Deposit Amount<br/>
            <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => {
                setDeposit(e.currentTarget.value);
                setDepositComplete(false);
                }} /> <br />
            <button type="submit" className="btn btn-light" onClick={makeDeposit} disabled={!formFilled}>Make Deposit</button> <br />
        </>
        ) : (
            <>
            </>
        )}
        />
     );
 }