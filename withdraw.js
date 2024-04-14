function Withdraw(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);

    const [withdrawal, setWithdrawal] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [withdrawalComplete, setWtihdrawalComplete] = React.useState(false);


    function makeWithdrawal() {
        if (Number(balance) >= Number(withdrawal)) {
        let newBalance = Number(balance) - Number(withdrawal)
        setBalance(newBalance);
        currentUser.balance = newBalance;
        ctx.users.forEach(user => {
            if (user.email === currentUser.user) { 
                user.balance = newBalance 
            };
        });
        setWtihdrawalComplete(true);
        } else {
            alert("You do not have enough funds. Please lower the withdrawal amount.")
        }
    }
    
    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Withdrawal"
        title={currentUser.user != '' ? `Welcome, ${currentUser.name}. Your current balance is $${balance}.` : "Please log in to make a withdrawal."}       
        text={withdrawalComplete && `You have successfully withdrawn $${withdrawal}! Your current balance is $${balance}.`}       
        body={currentUser.user != '' ? (
            <>
            Withdrawal Amount<br/>
            <input type="number" className="form-control" id="withdrawal" placeholder="Enter Withdrawal Amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={makeWithdrawal}>Make Withdrawal</button> <br />
        </>
        ) : (
            <>

            </>
        )}
        />
     );
 }