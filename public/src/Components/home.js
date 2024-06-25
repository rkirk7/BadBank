import React, { useState, useEffect } from "react";
import { Card, CurrentUser } from "./context";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../App.css";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const firebaseApp = initializeApp(firebaseConfig);

export default function Home() {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUser);
  const [isUserSet, setIsUserSet] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(`User authenticated: ${user.email}`);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          email: user.email,
        }));
        setIsUserSet(true);
      } else {
        console.log("No user authenticated");
        setCurrentUser({
          name: "",
          email: "",
          balance: 0,
          password: "",
          role: "none",
        });
        setIsUserSet(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserSet && currentUser.email) {
      getBalance(currentUser.email);
    }
  }, [isUserSet, currentUser.email]);

  async function getBalance(email) {
    try {
      const url = `/account/balance/${email}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch balance");
      }
      const data = await res.json();
      setCurrentUser((prevUser) => ({
        ...prevUser,
        balance: data.balance,
      }));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Regan's Bad Bank"
      title={currentUser.name ? `Welcome, ${currentUser.name}.` : ""}
      body={currentUser.name ? (
        <>
          Your current balance is ${currentUser.balance}. You can{" "}
          <Link to="/deposit" className="mylink">
            make a deposit
          </Link>{" "}
          or{" "}
          <Link to="/withdraw" className="mylink">
            withdraw fake cash
          </Link>
          !
        </>
      ) : (
        <>
          Please{" "}
          <Link to="/login" className="mylink">
            log in
          </Link>{" "}
          or{" "}
          <Link to="/CreateAccount" className="mylink">
            create an account
          </Link>{" "}
          to continue.
        </>
      )}
      centered={<img src={require("../Images/BadBankLogo.png")} className="img-fluid" alt="Bank Icon" />}
    />
  );
}
