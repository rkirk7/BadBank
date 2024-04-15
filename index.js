function Spa() {
    
    return (
        <HashRouter>
            <AllActivity.Provider value={[]}>
                <CurrentUser.Provider value={{key:null, loggedin: false, email: '', name: '', balance:0}}>
        <UserContext.Provider value={[{key:1, name:"regan", email:"regan", password:"test", balance:200}]}>
   <Route render={({ location }) => (
    <>
                <NavBar location={location}/>
  
        <Route path="/" exact component={Home} />
        <Route path="/CreateAccount/" exact component={CreateAccount} />
        <Route path="/login/" exact component={Login} />
        <Route path="/deposit/" exact component={Deposit} />
        <Route path="/withdraw/" exact component={Withdraw} />
        <Route path="/alldata/" exact component={AllData} />
        </>
   )} />
     </UserContext.Provider>
     </CurrentUser.Provider>
     </AllActivity.Provider>
      
        </HashRouter>

    );
}

ReactDOM.render(
    <Spa />,
    document.getElementById("root")
)