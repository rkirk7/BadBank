function AllData(){
    const ctx = React.useContext(UserContext);
    const currentUser = React.useContext(CurrentUser);

    const userList = ctx.users.map(user => {
        return (
          <tr key={user.name}>
            <td>{user.name}</td>
            <td>${user.balance}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
          </tr>
        );
      });


    return (
        <div className="container">
<table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Balance</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
    </tr>
  </thead>
  <tbody>
    {userList}
  </tbody>
</table>
</div>
    );
}