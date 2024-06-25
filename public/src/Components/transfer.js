import React, {useEffect} from "react";
import { Card, CurrentUser } from "./context";
import {checkAuthentication, getBalance} from "./loading"
import { useNavigate } from "react-router-dom";

export default function Transfer(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [transferAmount, setTransferAmount] = React.useState(0);
    const [lastTransfer, setLastTransfer] = React.useState(0);
    const [toEmail, setToEmail] = React.useState('');
    const [fromBalance, setFromBalance] = React.useState(currentUser.balance);
    const [toBalance, setToBalance] = React.useState(0);
    const [formFilled, setFormFilled] = React.useState(true);
    const [transferComplete, setTransferComplete] = React.useState(false);
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

    async function makeTransfer() {
        try {
            if (isNaN(Number(transferAmount))) {
                alert('Your transfer must be a valid number.'); 
                return;
            }
            if ((Number(transferAmount)) <= 0) {
                alert('Your transfer cannot be a negative number.'); 
                return;
            }
            if (Number(transferAmount) > Number(currentUser.balance)) {
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
            if (!toEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                alert('You must enter a valid email address for the recipient. Please try again.'); 
                return;
            }
    
            let receiveUserBalanceURL = `/account/balance/${toEmail}`;
    
            const res2 = await fetch(receiveUserBalanceURL);
            const data2 = await res2.json();
    
            if (!data2) {
                alert("Error: Could not find recipient's account. Please check their email and try again.")
                return;
            }
    
            let newFromBalance = parseInt(currentUser.balance) - parseInt(transferAmount);
            let newToBalance = parseInt(data2.balance) + parseInt(transferAmount);
    
            setFromBalance(newFromBalance);
            setToBalance(newToBalance);
    
            const url = `/account/transfer/${currentUser.email}/${toEmail}/${transferAmount}/${newFromBalance}/${newToBalance}`;
            await fetch(url);
    
            setCurrentUser(user => ({
                ...user,
                balance: newFromBalance
            }));
    
            setLastTransfer(transferAmount);
            setTransferAmount(0);
            setToEmail('');
            setTransferComplete(true);
    
        } catch (error) {
            console.error('Transfer failed:', error);
            alert('Failed to make transfer. Please try again.');
        }
    }
    
    
    React.useEffect(() =>{
        setFormFilled(transferAmount != '0' && transferAmount != '' && toEmail != null && toEmail != ''); 
    }, [transferAmount, toEmail])

    return (
        <>
        {!loading && (
            <form>
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Transfer"
        text={`${currentUser.name}, your balance is $${currentUser.balance}.`}       
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
        </form>
        )} </>
     );
 }