import React from 'react'
import { useState, useContext } from 'react'
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {userContext} from "../context/index";

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [state,setState]=useContext(userContext);
    const history=useHistory();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            // console.log(name,email.password,secret);
            const {data}=await axios.post(`http://localhost:8000/api/login`,{
                email,password
            })
            setState({
                user:data.user,
                token:data.token
            })
            
            // save in localStorage
            window.localStorage.setItem('auth',JSON.stringify(data))

            history.push('/main');
        } catch(err){
            toast.error(err.response.data)
        }
    }

    if(state && state.token){
        history.push('/main');
    }
    

    return (
        
        <div className="container-fluid">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center py-5">
                <h1>Login</h1>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group p-2">
                            <label className="text-muted">Email Address</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password"></input>
                        </div>
                        <div className="form-group p-2">
                            <button className="btn btn-primary col-12">
                                Login
                            </button>
                        </div>
                    </form>
                    

                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Not yet registered? 
                        <Link to="/register">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
