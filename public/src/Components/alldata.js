import React, {useEffect} from "react";
import {Table, CurrentUser} from "./context";
import { useNavigate } from "react-router-dom";
import { checkAuthorization } from "./firebase";

export default function AllData(){
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [loading, setLoading] = React.useState(true);
  const [showAllUsers, setShowAllUsers] = React.useState(true);
  const [showActivity, setShowActivity] = React.useState(true);
  const [userSearch, setUserSearch] = React.useState('');
  const [activitySearch, setActivitySearch] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [activityList, setActivityList] = React.useState([]);


  useEffect(() => {
    async function loadPage() {
        if (!currentUser.email) {
          let res = await checkAuthorization(setCurrentUser);
          if (!res) {
            navigate('/');
            return;
          }
        } 

        const response = await getTheData();
        setUserList(response.userList);
        setActivityList(response.activityList);
        setLoading(false);
    }

    async function getTheData() {
      let userList = [];
      let activityList = [];
    
      if (currentUser.role === 'admin') {
        let accountRes = await fetch('/account/all');
        let data = await accountRes.json()
      let userSearchQuery = data.filter((user) =>
         user.email && user.email.toLowerCase().includes(userSearch.toLowerCase())
      ) || [];
      
    userList = userSearchQuery.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>${user.balance}</td>
          <td>{user.email}</td>
          <td>{user._id}</td>
        </tr>
      ));
    }
    
    if (currentUser.role !== '') {
      let res = await fetch(`/account/getActivity/${currentUser.email}/${currentUser.role}`)
      let activityData = await res.json();
    
    let activitySearchQuery = activityData.filter((account) =>
      account.email && account.email.toLowerCase().includes(activitySearch.toLowerCase())
    ) || [];
    
    activityList = activitySearchQuery.slice().reverse().map(account => (
      <tr key={account._id}>
        <td>{account.email}</td>
        <td>{account.activity}</td>
        <td>{new Date(account.date).toLocaleString()}</td>
      </tr>
    ));
    }
    
    return {
      activityList, 
      userList
    }
    }

    loadPage();
}, [currentUser.email, currentUser.role, setCurrentUser, userSearch, activitySearch]);


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
