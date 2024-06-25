import React, {useEffect} from "react";
import { Card, CurrentUser } from "./context";
import { useNavigate } from "react-router-dom";
import {checkAuthentication, getBalance} from "./loading"

export default function Withdraw(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [withdrawal, setWithdrawal] = React.useState(0);
    const [lastWithdrawal, setLastWithdrawal] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [withdrawalComplete, setWithdrawalComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadPage() {
            if (currentUser.email === '' || !currentUser) {
                await checkAuthentication(setCurrentUser, navigate);
            } 
            else {
                await getBalance(setCurrentUser, currentUser.email);
            }
            setLoading(false);
        }
        loadPage();
    }, []);


    function makeWithdrawal(e) {
        e.preventDefault();
        if (isNaN(Number(withdrawal))) {
            alert('Your withdrawal must be a valid number.'); 
            return;
        }
        if ((Number(withdrawal)) <= 0) {
            alert('Please enter your withdrawal amount as a positive number.'); 
            return;
        }
        if (!Number.isInteger(Number(withdrawal))) {
            alert('Error: You must withdraw dollars only, not cents. Please round up or down and try again.'); 
            return;
        }
        if (Number(withdrawal) > Number(balance)) {
            alert('Your balance is too low. Please enter a lower withdrawal amount.'); 
            return;
        }

        else {
        let newBalance = parseInt(balance) - parseInt(withdrawal)
        setBalance(newBalance);
        const updateUrl = `/account/updateBalance/${currentUser.email}/${newBalance}/withdrawal/${withdrawal}`;
        (async () => {
       await fetch(updateUrl);
       setBalance(newBalance);
       setCurrentUser(user => ({
        ...user,
        balance: newBalance
      })); 
        setLastWithdrawal(withdrawal);
        setWithdrawal(0);
        setWithdrawalComplete(true);
        })();
        } 
    }

    React.useEffect(() =>{
        setFormFilled(withdrawal != '0' && withdrawal != ''); 
    }, [withdrawal])
    
    return (
        <>
        {!loading && (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Withdrawal"
        text={`${currentUser.name}, your balance is $${currentUser.balance}.`}       
        title={withdrawalComplete && `You have successfully withdrawn $${lastWithdrawal}!`}       
        body= {
            <>
            <form>
            Withdrawal Amount<br/>
            <input type="input" className="form-control" id="withdrawal" placeholder="Enter Withdrawal Amount" value={withdrawal} onChange={e => {
                setWithdrawal(e.currentTarget.value);
                setWithdrawalComplete(false);
                }} /> <br /> 

  <button type="submit" className="btn btn-light" onClick={makeWithdrawal} disabled={!formFilled}>Make Withdrawal</button> <br />
  </form>
        </>
        }
        
        />
    )};
        </>
     );
 }