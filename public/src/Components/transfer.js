import React from "react";
import { Card, CurrentUser } from "./context";

export default function Transfer(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [transferAmount, setTransferAmount] = React.useState(0);
    const [lastTransfer, setLastTransfer] = React.useState(0);
    const [toEmail, setToEmail] = React.useState('');
    const [fromBalance, setFromBalance] = React.useState(currentUser.balance);
    const [toBalance, setToBalance] = React.useState(0);
    const [formFilled, setFormFilled] = React.useState(true);
    const [transferComplete, setTransferComplete] = React.useState(false);

    React.useEffect(() => {
        getBalance();
      }, []);
    
      let receiveUserBalanceURL = '';
      const currentUserBalanceURL = `/account/balance/${currentUser.email}`;
      if (toEmail) {
       receiveUserBalanceURL = `/account/balance/${toEmail}`;
      }

      async function getBalance() {
        var res = await fetch(currentUserBalanceURL);
        var data = await res.json();
        setFromBalance(data.balance);
        if (toEmail) {
        try {
        var res2 = await fetch(receiveUserBalanceURL);
        var data2 = await res2.json();
        setToBalance(data2.balance);
        } catch {
            alert("Error: Could not find recipient's account. Please check their email and try again.")
            return;
        }
    }
     }

    async function makeTransfer() {
           if (isNaN(Number(transferAmount))) {
            alert('Your transfer must be a valid number.'); 
            return;
        }
        if ((Number(transferAmount)) <= 0) {
            alert('Your transfer cannot be a negative number.'); 
            return;
        }

        if (Number(transferAmount) > Number(fromBalance)) {
            alert('Your balance is too low. Please enter a lower amount.'); 
            return;
        }
        if (!Number.isInteger(Number(transferAmount))) {
            alert('Error: You must transfer dollars only, not cents. Please round up or down and try again.'); 
            return;
        }
        if (toEmail === currentUser.email){
            alert("You cannot transfer money to yourself. Please enter a valid recipient.")
            return;
        }

        if (toEmail === '') {
            alert('You must enter a valid email address for the recipient. Please try again.'); 
            return;
           }

           receiveUserBalanceURL = `/account/balance/${toEmail}`;

           async function getRecipientBalance() {
            try {
            var res2 = await fetch(receiveUserBalanceURL);
            var data2 = await res2.json();
            if (!data2) {
                alert("Error: Could not find recipient's account. Please check their email and try again.")
                return;
            }
            let newFromBalance = parseInt(fromBalance) - parseInt(transferAmount);
            let newToBalance = parseInt(data2.balance) + parseInt(transferAmount);
           setFromBalance(newFromBalance);
           setToBalance(newToBalance);
    
            const url = `/account/transfer/${currentUser.email}/${toEmail}/${transferAmount}/${newFromBalance}/${newToBalance}`;

        (async () => {
            console.log('fetching url:', url);
           let result = await fetch(url);
           
           setCurrentUser(user => ({
            ...user,
            balance: fromBalance
          })); 
            setLastTransfer(transferAmount);
            setTransferAmount(0);
            setToEmail('');
            setTransferComplete(true);
        })();
            } catch {
                alert("Error: Could not find recipient's account. Please check their email and try again.")
            return;
            }
        }

        await getRecipientBalance();
    }
    

    React.useEffect(() =>{
        setFormFilled(transferAmount != '0' && transferAmount != '' && toEmail != null && toEmail != ''); 
    }, [transferAmount, toEmail])


    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Transfer"
        text={`${currentUser.name}, your balance is $${fromBalance}.`}       
        title={transferComplete && `You have successfully transferred $${lastTransfer}!`}       
        body={
            <>
            Transfer Amount<br/>
            <input type="input" className="form-control" id="transfer" placeholder="Enter Transfer Amount" value={transferAmount} onChange={e => {
                setTransferAmount(e.currentTarget.value);
                setTransferComplete(false);
                }} /> <br /> 
            Transfer To<br/>
            <input type="input" className="form-control" id="recipient" placeholder="Enter Email" value={toEmail} onChange={e => {
                setToEmail(e.currentTarget.value);
                setTransferComplete(false);
                }} /> <br />     
        </>
        }
        centered={
    <>
            <button type="submit" className="btn btn-light" onClick={makeTransfer} disabled={!formFilled}>Make Transfer</button> <br />
    </>
        }
        />
     );
 }