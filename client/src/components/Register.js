import React from 'react'
import { useState , useContext} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {Modal} from 'antd'
import { Link, useHistory } from 'react-router-dom';
import {userContext} from "../context/index";

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [conf,setConf]=useState('');
    const [state,setState]=useContext(userContext);
    const [ok,setOk]=useState(false);
    const history=useHistory();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            // console.log(name,email,password);
            const {data}=await axios.post(`http://localhost:8000/api/register`,{
                name,email,password,conf
            })

            const {send}=axios.post(`http://localhost:8000/api/regEmail`,{email,name});

            setName('');
            setEmail('');
            setPassword('');
            setConf('');
            setOk(data.ok);
        } catch(err){
            toast.error(err.response.data)
        }
    }
    if(state && state.token){
        history.push('/');
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-5">
                <h1>Register</h1>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <label className="text-muted">Your Name</label>
                            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control" placeholder="Enter Name"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Email Address</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password"></input>
                        </div>
                        <div className="form-group p-2">
                            <label className="text-muted">Confirm Password</label>
                            <input value={conf} onChange={(e)=> setConf(e.target.value)} type="password" className="form-control" placeholder="Confirm Password"></input>
                        </div>
                        <div className="form-group p-2">
                            <button className="btn btn-primary col-12">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulations!"
                        visible={ok}
                        onCancel={()=>setOk(false)}
                        footer={null}
                    >
                        <p>You have been successfully registered.</p>
                        <Link to="/login">
                            <p className="btn btn-primary btn-sm">Login</p>
                        </Link>
                    </Modal>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already Registered?   
                        <Link to="/login">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
