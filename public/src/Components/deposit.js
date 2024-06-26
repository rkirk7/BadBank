import React, {useEffect} from "react";
import { Card, CurrentUser } from "./context";
import { useNavigate } from "react-router-dom";
import {checkAuthentication, getBalance} from "./loading"
import { checkAuthorization } from "./firebase";


export default function Deposit(){
    const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
    const [deposit, setDeposit] = React.useState(0);
    const [lastDeposit, setLastDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [depositComplete, setDepositComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadPage() {
            if (currentUser.email === '' || !currentUser) {
                let res = await checkAuthorization(setCurrentUser);
                if (!res) {
                    navigate('/');
                }
            } 
            else {
                await getBalance(setCurrentUser, currentUser.email);
            }
            setLoading(false);
        }
        loadPage();
    }, []);

    function makeDeposit(e) {
        e.preventDefault();
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
        let newBalance = parseInt(deposit) + parseInt(currentUser.balance)

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
        <>
        {!loading && (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Deposit"
        text={`${currentUser.name}, your balance is $${currentUser.balance}.`}       
        title={depositComplete && `You have successfully deposited $${lastDeposit}!`}       
        body={
            <>
            <form>
            Deposit Amount<br/>
            <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => {
                setDeposit(e.currentTarget.value);
                setDepositComplete(false);
                }} /> <br /> 
            <button type="submit" className="btn btn-light" onClick={makeDeposit} disabled={!formFilled}>Make Deposit</button> <br />
            </form>
    </>
        }
        />
    )};
    </>
     );
 }