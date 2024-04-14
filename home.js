function Home(){
    const currentUser = React.useContext(CurrentUser);

    return (
       <Card 
       bgcolor="primary"
       txtcolor="white"
       header="Welcome to Regan's Bank"
       title={currentUser.user != '' ? `Welcome, ${currentUser.name}` : "Welcome!"}       
       text={currentUser.user != '' ? `Your current balance is $${currentUser.balance}. You can make a deposit or withdraw cash.` : "Please log in or create an account to continue."}       
       body={(<img src="bank.png" className="img-fluid" alt="Responsive Image" />)}
       
       />
    );
}