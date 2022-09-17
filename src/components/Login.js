import './Login.css'
import {supabase} from './../supabase/supabase'
import {Navigate, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import Google from './google.jpg'

function Login() {
    const navigate = useNavigate();

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event, session) => {
            if(event==="SIGNED_IN"){
                await supabase.from('client').upsert({ user_id: session.user.id, email:session.user.email })
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
        <div className='Login'>
            <h1>Welcome to Cash Flow!</h1>
            <div className='button' onClick={signInWithGoogle}>
                <img src={Google}/><button>SignIn</button>
            </div>
        </div>
    )
}

export default Login