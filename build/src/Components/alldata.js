import React from "react";
import {Table, CurrentUser} from "./context";


export default function AllData(){

  const { currentUser } = React.useContext(CurrentUser);
  const [data, setData] = React.useState([]);

  if (currentUser.role === 'admin') {
  React.useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all')
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
  }, []);

  const userList = Array.isArray(data) && data.map(user => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>${user.balance}</td>
      <td>{user.email}</td>
      <td>{user._id}</td>
    </tr>
  ));

return (
  <div>
      
  <Table
  header="User Information"
  id="usertable"
  col1="Name"
  col2="Balance"
  col3="Email"
//  col4="Password"
  col4="ID"
  list={userList}

  />
  
  </div>

); }
else {
  alert('You do not have permission to view this page. If you believe this warning is in error, please contact the bank administrator.')
}
}
