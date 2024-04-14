function Balance(){
    const currentUser = React.useContext(CurrentUser);
    
    return (
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="Welcome to Regan's Bank"
        title={currentUser.user != '' ? `Welcome, ${currentUser.name}` : "Welcome!"}       
        body={currentUser.user != '' ? `Your current balance is $${currentUser.balance}.` : "Please log in or create an account to check your balance."}       
        
        />
     );
 }