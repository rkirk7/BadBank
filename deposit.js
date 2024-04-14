function Deposit(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);

    const [deposit, setDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(currentUser.balance);
    const [depositComplete, setDepositComplete] = React.useState(false);


    function makeDeposit() {
        let newBalance = Number(deposit) + Number(balance)
        setBalance(newBalance);
        currentUser.balance = newBalance;
        ctx.users.forEach(user => {
            if (user.email === currentUser.user) { 
                user.balance = newBalance 
            };
        });
        setDepositComplete(true);
    }
    



    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Make a Deposit"
        title={currentUser.user != '' ? `Welcome, ${currentUser.name}. Your current balance is $${balance}.` : "Please log in or create an account to make a deposit."}       
        text={depositComplete && `You have successfully deposited $${deposit}! Your current balance is $${balance}.`}       
        body={currentUser.user != '' ? (
            <>
            Deposit Amount<br/>
            <input type="number" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={makeDeposit}>Make Deposit</button> <br />
        </>
        ) : (
            <>
            </>
        )}
        />
     );
 }