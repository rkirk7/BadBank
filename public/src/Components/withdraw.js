import React from "react";
import { Card, CurrentUser, AllActivity } from "./context";

export default function Withdraw(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [withdrawal, setWithdrawal] = React.useState(0);
    const [lastWithdrawal, setLastWithdrawal] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [withdrawalComplete, setWtihdrawalComplete] = React.useState(false);

    const url = `/account/balance/${currentUser.email}`;
    React.useEffect(() => {
        getBalance();
      }, []);
    
      async function getBalance() {
        var res = await fetch(url);
        var data = await res.json();
        setBalance(data.balance);
     }



    function makeWithdrawal() {
        if (isNaN(Number(withdrawal))) {
            alert('Your withdrawal must be a valid number.'); 
            return;
        }
        if ((Number(withdrawal)) <= 0) {
            alert('Please enter your withdrawal amount as a positive number.'); 
            return;
        }
        if (Number(withdrawal) > Number(balance)) {
            alert('Your balance is too low. Please enter a lower withdrawal amount.'); 
            return;
        }

        else {
        let newBalance = Number(balance) - Number(withdrawal)
        setBalance(newBalance);
        const updateUrl = `/account/updateBalance/${currentUser.email}/${newBalance}/withdrawal/${withdrawal}`;
        (async () => {
       var res = await fetch(updateUrl);
       setBalance(newBalance);
       setCurrentUser(user => ({
        ...user,
        balance: newBalance
      })); 
        setLastWithdrawal(withdrawal);
        setWithdrawal(0);
        setWtihdrawalComplete(true);
        })();
        } 
    }

    React.useEffect(() =>{
        setFormFilled(withdrawal != '0' && withdrawal != ''); 
    }, [withdrawal])
    
    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Withdrawal"
        text={`${currentUser.name}, your balance is $${balance}.`}       
        title={withdrawalComplete && `You have successfully withdrawn $${lastWithdrawal}!`}       
        body= {
            <>
            Withdrawal Amount<br/>
            <input type="input" className="form-control" id="withdrawal" placeholder="Enter Withdrawal Amount" value={withdrawal} onChange={e => {
                setWithdrawal(e.currentTarget.value);
                setWtihdrawalComplete(false);
                }} /> <br /> 
            </>
        }
        
        centered={
        <>          
  <button type="submit" className="btn btn-light" onClick={makeWithdrawal} disabled={!formFilled}>Make Withdrawal</button> <br />
        </>
        }
        />
     );
 }