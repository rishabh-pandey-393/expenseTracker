import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { userContext } from "../context/index";
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import UserRoute from './routes/UserRoute';
const Budget = ({mode}) => {
    const [needs, setNeeds] = useState(50);
    const [wants, setWants] = useState(30);
    const [saves, setSaves] = useState(20);
    const [income, setIncome] = useState(0);
    const [sneeds, setSneeds] = useState(0);
    const [swants, setSwants] = useState(0);
    const [state, setState] = useContext(userContext);
    const history = useHistory();
    const fetchTotalMoney = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/totalMoney", {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            setIncome(data);
            // console.log("Income ", data);
        } catch (err) {
            console.log(err);
        }
    }
    const getBudget = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/getBudget", {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            setSaves(data.saves);
            setWants(data.wants);
            setNeeds(data.needs);
            // console.log("N, w, s ",data);
        } catch (err) {
            console.log(err);
        }
    }

    const Debit = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/debit", {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            setSneeds(data.need);
            setSwants(data.want);
            // console.log("n, w ", data);
        } catch (err) {
            console.log(err);
        }
    }

    const editBudget = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/editBudget", { saves, needs, wants, email: state.user.email }, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            if (data.error) {
                toast.error(data.error)
            }
            else {
                setSaves(data.saves);
                setWants(data.wants);
                setNeeds(data.needs);
                // console.log("N, w, s ", data);
            }
            getBudget();

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (state && state.token) {
            fetchTotalMoney();
            getBudget();
            Debit();
        }
    }, [state && state.token])

    var color;
    if(mode==='light'){
        color='black'
    }
    else{
        color='white'
    }

    return (
        <UserRoute>
            <div className="container">
                <h1 className="text-center my-3" style={{color:color}}>Personal Expense Tracker</h1>
                <div className="col text-center p-4">
                    <h3 style={{color:color}}>Manage Budget</h3>
                </div>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="alert alert-success text-center" role="alert" style={{ width: "100%" }}>
                            <b>Total Income: {income}</b>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mx-3 my-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Adjust Budget
                        </button>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Adjust Budget</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="d-flex justify-content-between">
                                            <div className="form-group">
                                                <label for="per_nes">Enter Neccesities Percentage</label>
                                                <input value={needs} onChange={(e) => { setNeeds(e.target.value) }} type="text" className="form-control" placeholder="Enter Percentage" v />
                                            </div>
                                            <div className="form-group">
                                                <label for="per_want">Enter Wants Percentage</label>
                                                <input value={wants} onChange={(e) => { setWants(e.target.value) }} type="text" className="form-control" placeholder="Enter Percentage" />
                                            </div>
                                            <div className="form-group">
                                                <label for="(100-per_nes-per_want)">Enter Savings Percentage</label>
                                                <input value={saves} onChange={(e) => { setSaves(e.target.value) }} type="text" className="form-control" placeholder="Percentage" />
                                            </div>

                                        </form>

                                    </div>
                                    <div className="modal-footer">
                                        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" className="btn btn-primary" onClick={editBudget}>Save Changes</button>
                                    </div>
                                </div></div> </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                            <b>Neccesities(Spent): {sneeds}</b>
                        </div>
                        <div className="alert alert-primary" role="alert"
                            style={{ width: "40%" }}>
                            <b>Neccesities(Calculated): {(needs * income) / 100}</b>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                            <b>Wants(Spent): {swants}</b>
                        </div>
                        <div className="alert alert-primary" role="alert"
                            style={{ width: "40%" }}>
                            <b>Wants(Calculated): {(wants * income) / 100}</b>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                            <b>Savings(Saved): {income - sneeds - swants}</b>
                        </div>
                        <div className="alert alert-primary" role="alert"
                            style={{ width: "40%" }}>
                            <b>Savings(Calculated): {(saves * income) / 100}</b>
                        </div>
                    </div>

                </div>

            </div>
            <div className="d-flex justify-content-around">
            <div>
                    <Pie
                        data={
                            {
                                labels: ['Needs', 'Wants', 'Savings'],
                                datasets: [
                                    {
                                        label: 'Budget Pie Chart',
                                        data: [sneeds, swants, income - sneeds - swants],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)'
                                        ],
                                    }
                                ]
                            }
                        }
                        height={400}
                        width={600}
                    />
                    <h3 className="text-center" style={{color:color}}>User Expenditure Pie Chart</h3>
                </div>
                <div>
                    <Pie
                        data={
                            {
                                labels: ['Needs', 'Wants', 'Savings'],
                                datasets: [
                                    {
                                        label: 'Budget Pie Chart',
                                        data: [(needs * income) / 100, (wants * income) / 100, (saves * income) / 100],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)'
                                        ],
                                    }
                                ]
                            }
                        }
                        height={400}
                        width={600}
                    />
                    <h3 className="text-center" style={{color:color}}>User Calculated Budget Pie Chart</h3>
                </div>
            </div>
            <div className="container">
                {sneeds <= (needs * income) / 100 ? <div className="alert alert-success" role="alert">
                    Your Neccesities Budget Is Under Control.
                </div> : <div className="alert alert-danger" role="alert">
                    You Have Exceeded Your Neccesities Budget.
                </div>}
                {swants <= (wants * income) / 100 ? <div className="alert alert-success" role="alert">
                    Your Wants Budget Is Under Control.
                </div> : <div className="alert alert-danger" role="alert">
                    You Have Exceeded Your Wants Budget.
                </div>}
                {income - sneeds - swants >= (saves * income) / 100 ? <div className="alert alert-success" role="alert">
                    Your Savings Are Under Control.
                </div> : <div className="alert alert-danger" role="alert">
                    You Have Subceeded Your Savings Budget.
                </div>}
            </div>
        </UserRoute>
    )
}

export default Budget
