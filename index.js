function Spa() {
    return (
        <HashRouter>
        <NavBar />
        <UserContext.Provider value={{users: [{name:'Regan', email:'regan.kirk@gmail.com', password:'secret',balance:100} ] }}>
        <Route path="/" exact component={Home} />
        <Route path="/CreateAccount/" exact component={CreateAccount} />
        <Route path="/login/" exact component={Login} />
        <Route path="/deposit/" exact component={Deposit} />
        <Route path="/withdraw/" exact component={Withdraw} />
        <Route path="/balance/" exact component={Balance} />
        <Route path="/alldata/" exact component={AllData} />
        </UserContext.Provider>
        </HashRouter>

    );
}

ReactDOM.render(
    <Spa />,
    document.getElementById("root")
)