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
        console.log(userData);
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
                    <p>CashFlow</p>
                </div>
                <button onClick={deAuthenticate}>LogOut</button>
            </div>
            <div className='balance'>
                <p>{userData.balance>=0 ? userData.balance : ""}</p>
                <p>{userData.budget>=0 ? userData.budget : ""}</p>
                <input type="number" defaultValue={0} onChange={(e)=>{setBalance(parseInt(e.target.value)); console.log(balance);}}></input>
                <input type="number" defaultValue={0} onChange={(e)=>{setBudget(parseInt(e.target.value)); console.log(budget);}}></input>
                <button onClick={updateBalance}>Update Balance</button>
                <button onClick={updateBudget}>Update Budget</button>
            </div>
        </div>
    )
}

export default Home