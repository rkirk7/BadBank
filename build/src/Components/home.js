import React from "react";
import { Card, CurrentUser, UserContext, AllActivity } from "./context";

export default function Home(){
    const currentUser = React.useContext(CurrentUser);
    const ctx = React.useContext(UserContext);

    return (
       <Card 
       bgcolor="primary"
       txtcolor="white"
       header="Welcome to Regan's Totally Legitimate Bank of Fake Money"
       title={currentUser.name != '' ? `Welcome, ${currentUser.name}` : ''}       
       text="We are thrilled to be located in the Cayman Islands, where taxes are a thing of the past!"
       body={currentUser.name != '' ? `Your current balance is $${currentUser.balance}. You can make a deposit or withdraw fake cash!` : "Please log in or create an account to continue."}       
       centered={(<img src={require ('../Images/bank.png')} className="img-fluid" alt="Bank Icon" />)}
       
       />
    );
}