const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut, browserLocalPersistence } = require("firebase/auth");

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
  setPersistence(auth, browserLocalPersistence);

  async function createFirebase(name, email, password, requestedRole, setCurrentUser) {
    try {
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
    const user = auth.currentUser;
    if (!user) {
        console.log(`no user logged in`);
        setCurrentUser(user => ({
            email: '',
            name: '',
            balance: '',
            role: ''
       })); 
        return false;
    } else {
        console.log(`${user} is logged in`);
        const url = `/authorization/${user.email}`;
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
    }
}

  module.exports = {createFirebase, loginFirebase, logout, checkAuthorization}