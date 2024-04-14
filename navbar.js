function NavBar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Bad Bank</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link" href="#/CreateAccount/">Create Account</a>
        <a className="nav-link" href="#/login/">Login</a>
        <a className="nav-link" href="#/deposit/">Deposit</a>
        <a className="nav-link" href="#/withdraw/">Withdraw</a>
        <a className="nav-link" href="#/balance/">Balance</a>
        <a className="nav-link" href="#/alldata/">All Data</a>
      </div>
    </div>
  </div>
</nav>
        </>
    );
}