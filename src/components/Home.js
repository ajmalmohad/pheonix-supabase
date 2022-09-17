import { useEffect, useState } from 'react'
import './Home.css'
import { supabase } from './../supabase/supabase'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [balance, setBalance] = useState(0);
    const [budget, setBudget] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(supabase.auth.currentUser);
        getUserData();
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(event);
            if (event === "SIGNED_OUT") {
                navigate('/login');
            }
        })
    }, [user])

    async function getUserData() {
        const user = supabase.auth.user();
        let { data } = await supabase
            .from('client')
            .select(`*`)
            .eq('user_id', user.id)
            .single();
        setUserData(data);
        console.log(user);
    }

    async function deAuthenticate() {
        await supabase.auth.signOut()
    }

    async function updateBalance(){
        if(isNaN(balance)){
            alert('Not a Number');
            return;
        }
        await supabase
        .from('client')
        .update({balance:balance})
        .eq('user_id', user.id);
        setUserData({
            ...userData,
            balance: balance
        });
        setBalance(balance);
    }

    async function updateBudget(){
        if(isNaN(budget)){
            alert('Not a Number');
            return;
        }
        await supabase
        .from('client')
        .update({balance:balance})
        .eq('user_id', user.id);
        setUserData({
            ...userData,
            budget: budget
        });
        setBalance(budget);
    }

    return (
        <div>
            <div className='header'>
                <div className='left'>
                    <img src={user.user_metadata ? user.user_metadata.avatar_url: ""} alt="User" referrerPolicy="no-referrer"/>
                    <p className='welcome'>Welcome back {user.user_metadata ? user.user_metadata.full_name + "!" : "!"}</p>
                </div>
                <button className='logout' onClick={deAuthenticate}>Log Out</button>
            </div>
            <div className='money'>
                <div className='balance'>
                    <p>{userData.balance>=0 ? userData.balance : ""}</p>
                    <input type="number" defaultValue={userData.balance} onChange={(e)=>{setBalance(parseInt(e.target.value)); console.log(balance);}}></input>
                    <button onClick={updateBalance}>Update Balance</button>
                </div>
                
                <div className='budget'>
                    <p>{userData.budget>=0 ? userData.budget : ""}</p>
                    <input type="number" defaultValue={userData.budget} onChange={(e)=>{setBudget(parseInt(e.target.value)); console.log(budget);}}></input>
                    <button onClick={updateBudget}>Update Budget</button>
                </div>
            </div>
        </div>
    )
}

export default Home