import {React,useContext} from 'react'
import axios from 'axios';
import {userContext} from "../context/index";
import { useLocation } from 'react-router-dom';

const DebtData = ({expenses,setExpenses}) => {
    
    const [state,setState]=useContext(userContext);
    var email="";
    if(state!=null) {email=state.user.email;}

    const handleDelete=async(id)=>{

        const {send}=axios.post(`http://localhost:8000/api/deleteDebtEmail/${id}`,{email},{
            headers:{
                Authorization:'Bearer '+state.token
            }
        });
        const {data}=await axios.delete(`http://localhost:8000/api/deleteexpense/${id}`,{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            });
        const newExpenses=expenses.filter((expense)=> {return expense._id!==id});
        setExpenses(newExpenses);
    }

    return (
        <>
            {expenses && expenses.map((expense)=>
                <tr key={(expense._id)}>
                <td>{(expense._id).slice(expense._id.length-5,expense._id.length)}</td>
                <td>{expense.cat}</td>
                <td>{expense.desc}</td>
                <td>{expense.InterestType}</td>
                <td>{(expense.amount)}</td>
                <td>{expense.percentage}</td>
                <td>{Math.round((Number(expense.amount)*Number(expense.percentage))/100)}</td>
                <td>{(expense.date).slice(0,10)}</td>
                <td>{expense.receipt!==""?<a href={expense.receipt} target="_blank" className="btn btn-sm btn-primary" role="button">Open Receipt</a>:<></>}
                <button onClick={()=>{handleDelete(expense._id)}} type="button" className="btn btn-danger btn-sm mx-1">Delete
                </button>
                </td>
                </tr>
            )}
        </>
    )
}

export default DebtData
