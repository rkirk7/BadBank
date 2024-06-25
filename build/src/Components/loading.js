export async function checkAuthentication(setCurrentUser, navigate) {
    const authorizationURL = `/authorization/`;
    try {
        const res = await fetch(authorizationURL);
        if (res.ok) {
            let user = await res.json();
            if (!user.email) {
                setCurrentUser({
                    name: '',
                    email: '',
                    balance: 0,
                    password: '',
                    role: 'none'
                });
                navigate('/');
            } else {
                setCurrentUser(user);
                return null;
            }
        } else {
            setCurrentUser({
                name: '',
                email: '',
                balance: 0,
                password: '',
                role: 'none'
            });
            navigate('/');
        }
    } catch (error) {
        console.error('Authorization review failed:', error);
        setCurrentUser({
            name: '',
            email: '',
            balance: 0,
            password: '',
            role: 'none'
        });
        navigate('/');
    }
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