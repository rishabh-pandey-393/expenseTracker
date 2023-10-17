import React from 'react';
import DebtTable from './DebtTable';
import { useState, useContext, useEffect, useRef } from 'react';
import { userContext } from "../context/index";
import axios from 'axios';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import UserRoute from './routes/UserRoute';
import { useHistory } from 'react-router-dom';


const Debt = ({mode}) => {

    const ref = useRef();

    var email = "";
    const [state, setState] = useContext(userContext);
    const [type, setType] = useState("");
    const [InterestType, setInterestType] = useState("Simple");
    const [desc, setDesc] = useState("");
    if (state != null) { email = state.user.email; }
    const [amount, setAmount] = useState("0");
    const [percentage, setPercentage] = useState("");
    const [cat, setCat] = useState("");
    const [date, setDate] = useState(Date.now());
    const [receipt, setReceipt] = useState("");
    const [loading, setLoading] = useState(false);

    const [expenses, setExpenses] = useState([]);
    const history = useHistory();
    const AddTransaction = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8000/api/addexpense", { type,InterestType, desc, amount,percentage, cat, date, receipt }, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            });
            // console.log("res=>",data);
            if (data.error) {
                toast.error(data.error)
            }
            else {
                fetchUserExpenses();
                toast.success("Expense added");
                const { send } = axios.post("http://localhost:8000/api/addDebtEmail", { type,InterestType, desc, amount,percentage, cat, date, email }, {
                    headers: {
                        Authorization: 'Bearer ' + state.token
                    }
                });
                setType("");
                setInterestType("Simple");
                setAmount("");
                setPercentage("");
                setCat("");
                setDate(Date.now());
                setDesc("");
                setReceipt("");
                ref.current.value = "";
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (state && state.token) fetchUserExpenses();
    }, [state && state.token])


    const fetchUserExpenses = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/showDebt", {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            setExpenses(data);
            // console.log("user expenses=>", data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        // console.log([...formData]);
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:8000/api/uploadReceipt", formData, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            });
            // console.log("Uploaded image=>",data);
            setReceipt(data.url)
            // console.log(data.url);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    var color;
    if(mode==='light'){
        color='#121212'
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

    return (
        <UserRoute>
            <h1 className="text-center my-3" style={{color:color}}>Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3 style={{color:color}}>Manage Debt And Loan Repayments</h3>
            </div>

            <div className="container">
                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Expense
                </button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content" style={{backgroundColor:color2}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel" style={{color:color}}>Add Transaction</h5>
                                <button type="button" className={`btn-close ${mode==='dark'?('btn-close-white'):('')}`} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-column bd-highlight mb-3" >
                                    <div className="p-2 bd-highlight">
                                        <div className="d-flex justify-content-around">
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Transaction Type</label>
                                                </div>
                                                <div className="col-auto">
                                                    <select value={type} onChange={(e) => { setType(e.target.value) }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected>Select Transaction Type</option>
                                                        <option value="Debt/Loan">Debt/Loan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Description</label>
                                                </div>
                                                <div className="col-auto">
                                                    <input type="text" className="form-control" placeholder='Enter Description' value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Principal Amount</label>
                                                </div>
                                                <div className="col-auto">
                                                    <input type="text" className="form-control" placeholder='Enter Transaction Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                                                </div>

                                            </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Interest Type</label>
                                                </div>
                                                <div className="col-auto">
                                                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected value="Simple">Simple Interest</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="p-2 bd-highlight">
                                        <div className="d-flex justify-content-around">
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Repayment Date</label>
                                                </div>
                                                <div className="col-auto">
                                                    <input type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Receipt</label>
                                                </div>
                                                <div className="col-auto">
                                                    <input onChange={(e) => handleImage(e)} ref={ref} type="file" accept='images/*' className="form-control" />
                                                </div>
                                            </div>
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-auto">
                                                        <label className="col-form-label" style={{color:color}}>Interest In Percentage</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <input type="text" className="form-control" placeholder='Enter Interest Percentage' value={percentage} onChange={(e) => { setPercentage(e.target.value) }} />
                                                    </div>
                                                </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Transaction Catergory</label>
                                                </div>
                                                <div className="col-auto">
                                                    <select value={cat} onChange={(e) => { setCat(e.target.value) }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected>Select Debt/Loan Option</option>
                                                        <option value="Interest Collection">Interest Collection</option>
                                                        <option value="Debt">Debt</option>
                                                        <option value="Debt Repayment">Debt Repayment</option>
                                                        <option value="Loan Repayment">Loan Repayment</option>
                                                        <option value="Loan">Loan</option>
                                                        <option value="Interest Payment">Interest Payment</option>
                                                    </select>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button disabled={loading} data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Dismiss Transaction</button>
                                <button disabled={loading} onClick={AddTransaction} data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" className="btn btn-primary">Add Transaction</button>
                            </div>
                        </div>
                    </div>
                </div>
                <DebtTable expenses={expenses} setExpenses={setExpenses} mode={mode} />
            </div>
        </UserRoute>
    )
}

export default Debt
