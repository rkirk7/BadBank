import React from "react";
import {Table, CurrentUser} from "./context";


export default function AllData(){

  const { currentUser } = React.useContext(CurrentUser);
  const [data, setData] = React.useState([]);
  const [activityData, setActivityData] = React.useState([]);
  let userList;

  if (currentUser.role === 'admin') {
  React.useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all')
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
  }, []);

userList = Array.isArray(data) && data.map(user => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>${user.balance}</td>
      <td>{user.email}</td>
      <td>{user._id}</td>
    </tr>
  ));
}

React.useEffect(() => {
  fetch(`/account/getActivity/${currentUser.email}/${currentUser.role}`)
  .then(response => response.json())
  .then(newData => {
    setActivityData(newData);
  });
}, []);

let activityList = Array.isArray(activityData) && activityData.slice().reverse().map(account => (
  <tr key={account._id}>
    <td>{account.email}</td>
    <td>{account.activity}</td>
    <td>{new Date(account.date).toLocaleString()}</td>
  </tr>
));

return (
  <div>
    
      {(currentUser.role === "admin") &&
  <Table
  header="Admin View: All Users"
  id="usertable"
  col1="Name"
  col2="Balance"
  col3="Email"
  col4="ID"
  list={userList}
  />
      }

<Table
  header="Bank Activity"
  id="activitytable"
  col1="Email"
  col2="Activity"
  col3="Date"
  list={activityList}
  />
  
  </div>

);
}
