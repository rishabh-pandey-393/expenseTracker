import React from 'react'
import DebtData from './DebtData'

const DebtTable = ({expenses,setExpenses,mode}) => {

    var color;
    if(mode==='light'){
        color='black'
    }
    else{
        color='white'
    }
    return (
        <>
            <table className="table my-5" style={{color:color}}>
                <thead>
                    <tr>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Interest Type</th>
                        <th scope="col">Principal Amount</th>
                        <th scope="col">Interest Perentage</th>
                        <th scope="col">Interest Amount</th>
                        <th scope="col">Repayment Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <DebtData expenses={expenses} setExpenses={setExpenses}/>
                </tbody>
            </table>
        </>
    )
}

export default DebtTable
