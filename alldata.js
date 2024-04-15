function AllData(){
    const ctx = React.useContext(UserContext);
    const allActivity = React.useContext(AllActivity);

    const userList = ctx.map(user => {
        return (
          <tr key={user.key}>
            <td>{user.name}</td>
            <td>${user.balance}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.key}</td>
          </tr>
        );
      });

      let transactionList = [];

      if (allActivity.length > 0) {
        transactionList = allActivity.map(transaction => {
        const formattedDate = transaction.time.toLocaleString('en-US', { timeZoneName: 'short' });
        return (
          <tr key={transaction.key}>
            <td>{transaction.key}</td>
            <td>{transaction.userID}</td>
            <td>{transaction.activity}</td>
            <td>${transaction.balance}</td>
            <td>{formattedDate}</td>
          </tr>
        );
      });
    }


    return (
        <div>
            
        <Table
        header="User Information"
        id="usertable"
        col1="Name"
        col2="Balance"
        col3="Email"
        col4="Password"
        col5="ID"
        list={userList}

        />
        <br />
        

        <Table
        header="Bank Activity History"
        id="transactiontable"
        col1=""
        col2="User ID"
        col3="Activity"
        col4="Account Balance"
        col5="Date"
        list={transactionList}
        />
        
        </div>

    );
}