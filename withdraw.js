function Withdraw(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);
    const allActivity = React.useContext(AllActivity);


    const [withdrawal, setWithdrawal] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [formFilled, setFormFilled] = React.useState(true);
    const [withdrawalComplete, setWtihdrawalComplete] = React.useState(false);


    function makeWithdrawal() {
        if (isNaN(Number(withdrawal))) {
            alert('Your withdrawal must be a valid number.'); 
            return;
        }
        if ((Number(withdrawal)) <= 0) {
            alert('Please enter your withdrawal amount as a positive number.'); 
            return;
        }

        if (Number(balance) >= Number(withdrawal)) {
        let newBalance = Number(balance) - Number(withdrawal)
        setBalance(newBalance);
        currentUser.balance = newBalance;
        ctx.forEach(user => {
            if (user.email === currentUser.email) { 
                user.balance = newBalance 
            };
        });
        setWtihdrawalComplete(true);
        let date = new Date();
        allActivity.push({key:allActivity.length, userID:currentUser.key, name:currentUser.name, activity: `${currentUser.name} withdrew $${withdrawal}`, balance:newBalance, time:date})
        } else {
            alert("You do not have enough funds. Please lower the withdrawal amount.")
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
        text={currentUser.name != '' ? `${currentUser.name}, your balance is $${balance}.` : "Please log in to make a withdrawal."}       
        title={withdrawalComplete && `You have successfully withdrawn $${withdrawal}!`}       
        body={currentUser.name != '' ? (
            <>
            Withdrawal Amount<br/>
            <input type="input" className="form-control" id="withdrawal" placeholder="Enter Withdrawal Amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={makeWithdrawal} disabled={!formFilled}>Make Withdrawal</button> <br />
        </>
        ) : (
            <>

            </>
        )}
        />
     );
 }