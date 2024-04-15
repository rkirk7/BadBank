function NavBar({location}){

    let selected = location.pathname;
    selected = '#' + selected;

    return (
        <>
        
 <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container">
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
        <a 
        className={selected === "#/deposit/" ? "nav-link active" : "nav-link"} aria-current={selected === "#/deposit/" ? "page" : undefined} href="#/deposit/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to deposit fake money"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
            Deposit
            </a>
        </li>
        <li className="nav-item">
        <a 
        className={selected === "#/withdraw/" ? "nav-link active" : "nav-link"} aria-current={selected === "#/withdraw/" ? "page" : undefined} href="#/withdraw/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to withdraw fake money"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
            Withdraw
            </a>
        </li>
        <li className="nav-item">
        <a 
        className={selected === "#/alldata/" ? "nav-link active" : "nav-link"} aria-current={selected === "#/alldata/" ? "page" : undefined} href="#/alldata/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to see all the shady fake data"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
        All Data
        </a>
        </li>
        </ul>
        </div>
        <div className="collapse navbar-collapse align-items-center justify-content-center">
        <a 
        className="navbar-brand" aria-current={selected === "#/" ? "page" : undefined} href="#"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Return Home"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
        Regan's "Bad" Bank</a>
       </div>
        <div className="collapse navbar-collapse align-items-center justify-content-end">
      <ul className="navbar-nav">
      <li className="nav-item">
        <a 
        className={selected === "#/login/" ? "nav-link active" : "nav-link"} aria-current={selected === "#/login/" ? "page" : undefined} href="#/login/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to log in to your account"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
        Login</a>
       </li>
       <li className="nav-item">
        <a 
        className={selected === "#/CreateAccount/" ? "nav-link active" : "nav-link"} aria-current={selected === "#/CreateAccount/" ? "page" : undefined} href="#/CreateAccount/"
        data-container="body" 
        data-toggle="popover" 
        data-placement="bottom" 
        title="Click here to create an account"
        data-content="And here's some test content" 
        data-trigger="hover focus" >
        Create Account</a>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
        </>
    );
}


