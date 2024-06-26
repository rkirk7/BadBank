const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, signOut, onAuthStateChanged, browserLocalPersistence } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyDhKNCusOPW2y52bMwLnOrXIy-u1y1Q4KI",
    authDomain: "bank-f0c47.firebaseapp.com",
    projectId: "bank-f0c47",
    storageBucket: "bank-f0c47.appspot.com",
    messagingSenderId: "710670974978",
    appId: "1:710670974978:web:b724e76530555264b8271b"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();

  async function createFirebase(name, email, password, requestedRole, setCurrentUser)
   {
    try {
        await setPersistence(auth, browserLocalPersistence);

            const checkUrl = `/account/checkaccount/${email}`;
            let res = await fetch(checkUrl);
            let accountExists = await res.json();
            if (accountExists) {
           return 'Account exists';
        } else {
            await createUserWithEmailAndPassword(auth, email, password, requestedRole);
            const createUrl = `/account/createaccount/${name}/${email}/${requestedRole}`;
            let createRes = await fetch(createUrl);
            if (createRes.ok) {
            let data = await createRes.json();  
             setCurrentUser(user => ({
                email: data.email,
                name: data.name,
                balance: data.balance,
                role: data.role
                   })); 
            return 'Account created'
                } else {
                    return 'Error';
                  }
                }
      } catch (error) {
        console.error('Error creating user with Firebase:', error.code, error.message);
        return 'Error';
      }
            
  }

  async function loginFirebase(email, password, setCurrentUser) {
    try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
            const url = `/account/login/${email}`;
            let res = await fetch(url);
            if (res) {
            var data = await res.json();
        
            setCurrentUser(user => ({
                email: data.email,
                name: data.name,
                balance: data.balance,
                role: data.role
           })); 
           return true;
        } else {
            setCurrentUser(user => ({
                email: '',
                name: '',
                balance: '',
                role: ''
           })); 
            return false;
        }
    } catch (error) {
        setCurrentUser(user => ({
            email: '',
            name: '',
            balance: '',
            role: ''
       })); 
        console.error('Error logging in with Firebase:', error.code, error.message);
        return false;
    }
}

async function logout() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}

async function checkAuthorization(setCurrentUser) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(`${user.email} is logged in`);
            const url = `/authorization/${user.email}`;
            let res = await fetch(url);
            if (res.ok) {
                let data = await res.json();
                setCurrentUser(user => ({
                    email: data.email,
                    name: data.name,
                    balance: data.balance,
                    role: data.role
                }));
                return true;
            } else {
                setCurrentUser(user => ({
                    email: '',
                    name: '',
                    balance: '',
                    role: ''
                }));
                return false;
            }
        } else {
            setCurrentUser(user => ({
                email: '',
                name: '',
                balance: '',
                role: ''
            }));
            return false;
        }
    });
}

export async function getBalance(setCurrentUser, email) {
    try {
        const url = `/account/balance/${email}`;
        const res = await fetch(url);
        const data = await res.json();
        setCurrentUser(user => ({
            ...user,
            balance: parseInt(data.balance, 10)
        }));
    } catch (error) {
        console.error('Failed to fetch balance:', error);
    }
}


  module.exports = {createFirebase, loginFirebase, logout, checkAuthorization, getBalance}