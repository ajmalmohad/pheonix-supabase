import {supabase} from './../supabase/supabase'
import {Navigate} from 'react-router-dom'

function Protected({children }) {
    if (!supabase.auth.currentUser) {
        console.log("Not Authenticated");
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default Protected