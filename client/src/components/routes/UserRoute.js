import {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { userContext } from '../../context';

const UserRoute=({children})=>{
    const history=useHistory();
    const [ok,setOk]=useState(false);
    const [state,setState]=useContext(userContext);
    useEffect(()=>{
        if(state && state.token) getCurrentUser();
    },[state && state.token]);
    
    process.browser && 
    state===null &&
    setTimeout(() => {
        getCurrentUser();
    }, 1000);

    const getCurrentUser=async()=>{
        try{
            const {data}=await axios.get(
                'http://localhost:8000/api/currentuser',
                {
                    headers:{
                        Authorization:`Bearer ${state.token}`,
                    }
                }
            );
            if(data.ok) setOk(true);
        } catch(err){
            history.push('/');
        }
    };

    return <>{children}</>;
}



export default UserRoute;