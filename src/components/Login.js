import './Login.css'
import {supabase} from './../supabase/supabase'
import {Navigate, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event, session) => {
            if(event==="SIGNED_IN"){
                await supabase.from('client').upsert({ user_id: session.user.id, balance: 0, budget: 0, email:session.user.email })
                navigate('/');
            }
        })
    }, [])
    

    if (supabase.auth.currentUser) {
        console.log("Already Logged In");
        return <Navigate to="/" replace />;
    }
    
    async function signInWithGoogle() {
        await supabase.auth.signIn({provider: 'google'})
    }

    return (
        <div>
            <h1>Good to See You</h1>
            <button onClick={signInWithGoogle}>SignIn</button>
        </div>
    )
}

export default Login