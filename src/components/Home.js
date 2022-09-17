import {useEffect, useState} from 'react'
import './Home.css'
import {supabase} from './../supabase/supabase'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setUser(supabase.auth.currentUser);
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(event);
            if(event==="SIGNED_OUT"){
                navigate('/login');
            }
        })
    }, [user])

    async function getUserData(){
        
    }

    async function deAuthenticate(){
        await supabase.auth.signOut()
    }

  return (
    <div>
        <div className='header'>
            <div className='left'>
                <p>CashFlow</p>
            </div>
            <button onClick={deAuthenticate}>LogOut</button>
        </div>
        
    </div>
  )
}

export default Home