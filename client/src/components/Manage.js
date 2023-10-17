import {React,useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useContext} from 'react'
import {userContext} from "../context/index";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const Manage = ({mode}) => {
    var auth=JSON.parse(localStorage.getItem('auth'));

    const history=useHistory();
    const [state,setState]=useContext(userContext);
    const [oldp,setOldp]=useState("");
    const [newp,setNewp]=useState("");
    const [conf,setConf]=useState("");
    const [name,setName]=useState(auth.user.name);
    const [email,setEmail]=useState(auth.user.email);

    var color;
    if(mode==='light'){
        color='black'
    }
    else{
        color='white'
    }
    var color2;
    if(mode==='dark'){
        color2='#121212'
    }
    else{
        color2='white'
    }

    const deleteAccount=async()=>{
        try{

            const {data}=await axios.delete("http://localhost:8000/api/deleteUser",{
                headers:{
                    Authorization:'Bearer '+state.token
                },
                data:{
                    email:state.user.email
                }
            })
            
            const {send}=axios.post(`http://localhost:8000/api/delEmail`,{email,name});

            setState(null);
            history.push('/login');
            history.go(0);
            window.localStorage.removeItem('auth');
        } catch(err){
            console.log(err);
        }
    }

    const changePassword=async()=>{
        try{
            const {data}=await axios.put("http://localhost:8000/api/changePassword",{
                email:state.user.email,
                name:state.user.name,
                newp:newp,
                oldp:oldp,
                conf:conf
            },{
                headers:{
                    Authorization:'Bearer '+state.token
                },
            })
            if(data.error){
                toast.error(data.error);
            }
            else{
                toast.success("Password changed successfully.")
                const {send}=axios.post(`http://localhost:8000/api/passEmail`,{email,name});
                setNewp("");
                setOldp("");
                setConf("");
            }
            
            

        } catch(err){
            console.log(err);
        }

    }

    const editUser=async(e)=>{

        e.preventDefault();

        try{
            const {data}=await axios.put("http://localhost:8000/api/editUser",{
                email:email,
                name:name,
            },{
                headers:{
                    Authorization:'Bearer '+state.token
                },
            })
            
            if(data.error){
                toast.error(data.error);
            }
            else{
                

                var auth=JSON.parse(localStorage.getItem('auth'));
                auth.user.name=name;
                auth.user.email=email;
                localStorage.setItem('auth',JSON.stringify(auth));
                toast.success("Details changed successfully. Changes Will Take Place In a Few Seconds.");
                const {send}=axios.post(`http://localhost:8000/api/editEmail`,{email,name});
                setInterval(() => {
                    history.go(0);
                }, 5000);
            }
            

        } catch(err){
            console.log(err);
        }
        
    }


    return (
        <div className="container-fluid">
            <h1 className="text-center my-3" style={{color:color}}>Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3 style={{color:color}}>Manage Account Settings</h3>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form>
                        <div className="form-group p-2">
                            <label style={{color:color}}>Your Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" placeholder="Enter Name"></input>
                        </div>

                        <div className="form-group p-2">
                            <label style={{color:color}}>Email Address</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <button onClick={editUser} className="btn btn-primary col-12">
                                Apply Changes
                            </button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between my-4">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Change Password
                        </button>

                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content" style={{backgroundColor:color2}}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="#staticBackdropLabel" style={{color:color}}>Change Password</h5>
                                        <button type="button" className={`btn-close ${mode==='dark'?('btn-close-white'):('')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="d-flex flex-column bd-highlight mb-3">
                                            <label for="inputPassword5" className="form-label" style={{color:color}}>Enter Old Password</label>
                                            <input value={oldp} onChange={(e)=>setOldp(e.target.value)} type="password" placeholder="Enter Old Password" className="form-control" />
                                            <label for="inputPassword5" className="form-label" style={{color:color}}>Enter New Password</label>
                                            <input value={newp} onChange={(e)=>setNewp(e.target.value)} type="password" placeholder="Enter New Password" className="form-control" />
                                            <label for="inputPassword5" className="form-label" style={{color:color}}>Confirm New Password</label>
                                            <input value={conf} onChange={(e)=>setConf(e.target.value)} type="password" placeholder="Confirm New Password" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button onClick={changePassword} type="button" className="btn btn-primary" data-bs-dismiss="modal">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                            Delete Account
                        </button>

                        <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content" style={{backgroundColor:color2}}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="#staticBackdropLabel" style={{color:color}}>Delete Account</h5>
                                        <button type="button" className={`btn-close ${mode==='dark'?('btn-close-white'):('')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                       <h4 style={{color:color}}>Are you sure you want to delete your account?</h4>
                                       <span style={{color:color}}>You will lose all your Expenses Data.</span>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button onClick={state&& state.token && deleteAccount} type="button" className="btn btn-danger">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Manage
