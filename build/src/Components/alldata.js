import React, {useEffect} from "react";
import {Table, CurrentUser} from "./context";
import { useNavigate } from "react-router-dom";
import {checkAuthentication, getBalance} from "./loading"

export default function AllData(){
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activityData, setActivityData] = React.useState([]);
  const [showAllUsers, setShowAllUsers] = React.useState(true);
  const [showActivity, setShowActivity] = React.useState(true);
  const [userSearch, setUserSearch] = React.useState('');
  const [activitySearch, setActivitySearch] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);


  useEffect(() => {
    async function loadPage() {
      if (currentUser.email === '' || !currentUser) {
            await checkAuthentication(setCurrentUser, navigate);
            setLoggedIn(true);
        } 
        else {
            await getBalance(setCurrentUser, currentUser.email);
            setLoggedIn(true);
        }
    }

    loadPage();
}, []);

  let userList;

  if (currentUser.role === 'admin') {
  React.useEffect(() => {
    fetch('/account/all')
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoading(false);
    });
  }, [loggedIn]);

  let userSearchQuery = data.filter((user) => {
    return user.email && user.email.toLowerCase().includes(userSearch.toLowerCase());
  }) || [];
  
userList = userSearchQuery.map(user => (
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
    setLoading(false);
  });
}, [loggedIn]);

let activitySearchQuery = activityData.filter((account) => {
  return account.email && account.email.toLowerCase().includes(activitySearch.toLowerCase());
}) || [];


let activityList = activitySearchQuery.slice().reverse().map(account => (
  <tr key={account._id}>
    <td>{account.email}</td>
    <td>{account.activity}</td>
    <td>{new Date(account.date).toLocaleString()}</td>
  </tr>
));

return (
  <>
      {!loading && (
  <div>
      {currentUser.role === "admin" && (
        <div>
         <h1 className="tableheader"><a  className="myLink" onClick={ () => setShowAllUsers(!showAllUsers) }>Admin: All Users</a></h1>
        { showAllUsers && ( <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
         <input type="text" placeholder="Search by Email" value={userSearch} onChange={e => {
                setUserSearch(e.currentTarget.value);
                }}></input>
                </div>
                )}
      
      {showAllUsers && (
      
  <Table
  id="usertable"
  col1="Name"
  col2="Balance"
  col3="Email"
  col4="ID"
  list={userList}
  />
      )}
      </div>
     )}
     <div>
     {currentUser.role === "admin" ? (
      <div>
     <h1 className="tableheader"><a className="myLink" onClick= { () => setShowActivity(!showActivity)}>Admin: All Bank Activity</a></h1>
     {showActivity && (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <input type="text" placeholder="Search by Email" value={activitySearch} onChange={e => {setActivitySearch(e.currentTarget.value);
        }}>
        </input>
        </div>
              )}
     </div>
     
     ) : (
      <h1 className="tableheader">My Activity</h1>
     ) }

      {showActivity && (

<Table
  id="activitytable"
  col1="Email"
  col2="Activity"
  col3="Date"
  list={activityList}
  />
      )}
  </div>
  </div>
      )};
  </>
);
}
