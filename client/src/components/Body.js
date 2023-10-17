import React from 'react'
import { useState, useContext, useEffect ,useRef} from 'react';
import { userContext } from "../context/index";
import axios from 'axios';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import UserRoute from './routes/UserRoute';
import { useHistory } from 'react-router-dom';
import Expense from './Expense';
import ExpenseReport from './ExpenseReport';
import { Link } from 'react-router-dom';
const Body = ({mode}) => {

    const ref = useRef();

    var email="";
    const [state, setState] = useContext(userContext);
    const [type, setType] = useState("");
    const [desc, setDesc] = useState("");
    if(state!=null) {email=state.user.email;}
    const [amount, setAmount] = useState("0");
    const [cat, setCat] = useState("");
    const [date, setDate] = useState(Date.now());
    const [curr1, setCurr1] = useState("INR");
    const [curr2, setCurr2] = useState("INR");
    const [mul, setMul] = useState(1);
    const [receipt,setReceipt]=useState("");
    const [loading,setLoading]=useState(false);

    const [expenses, setExpenses] = useState([]);
    const history = useHistory();

    const currency = async () => {
        let { data } = await axios.get(`https://api.fastforex.io/fetch-one?from=${curr1}&to=${curr2}&api_key=f454927b42-879011f180-r4gbj6`);

        setMul(data.result[curr2]);
        setCurr1(curr2);
        setCurr2(curr2);
    }

    const AddTransaction = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8000/api/addexpense", { type, desc, amount, cat, date,receipt}, {
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
                const {send}=axios.post("http://localhost:8000/api/addEmail",{ type, desc, amount, cat, date,email }, {
                    headers: {
                        Authorization: 'Bearer ' + state.token
                    }});
                    setType("");
                    setAmount("");
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

    useEffect(() => {
        currency();
    }, [curr2])

    const fetchUserExpenses = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/showexpenses", {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            })
            setExpenses(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleImage=async(e)=>{
        const file=e.target.files[0];
        let formData=new FormData();
        formData.append('image',file);
        // console.log([...formData]);
        setLoading(true)
        try {
            const {data}=await axios.post("http://localhost:8000/api/uploadReceipt",formData,{
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            });
            // console.log("Uploaded image=>",data);
            setReceipt(data.url)
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
            <div className="container">
                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Expense
                </button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content" style={{backgroundColor:color2}}>
                            <div className="modal-header" >
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
                                                        <option value="Debit">Debit</option>
                                                        <option value="Credit">Credit</option>
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
                                                    <label className="col-form-label" style={{color:color}}>Transaction Amount</label>
                                                </div>
                                                <div className="col-auto">
                                                    <input type="text" className="form-control" placeholder='Enter Transaction Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="p-2 bd-highlight">
                                        <div className="d-flex justify-content-around">
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Transaction Date</label>
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
                                                    <input onChange={(e)=>handleImage(e)} ref={ref} type="file" accept='images/*' className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center">
                                                <div className="col-auto">
                                                    <label className="col-form-label" style={{color:color}}>Transaction Catergory</label>
                                                </div>
                                                <div className="col-auto">

                                                    {type === 'Credit' ?
                                                        <select value={cat} onChange={(e) => { setCat(e.target.value) }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                            <option selected>Select Credit Option</option>
                                                            <option value="Salary">Salary</option>
                                                            <option value="Other Income">Other Income</option>
                                                        </select> : (type === 'Debit' ?
                                                            <select value={cat} onChange={(e) => { setCat(e.target.value) }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                <option selected>Select Debit Option </option>
                                                                <option value="Food And Beverage">Food And Beverage</option>
                                                                <option value="Transportation">Transportation</option>
                                                                <option value="Rentals">Rentals</option>
                                                                <option value="Water And Electricity">Water And Electricty</option>
                                                                <option value="Phone and Internet">Phone and Internet</option>
                                                                <option value="Gas/LPG">Gas/LPG</option>
                                                                <option value="Streaming Services">Streaming Services</option>
                                                                <option value="Home Maintainence">Home Maintainence</option>
                                                                <option value="Vehicle Maintainence">Vehicle Maintainence</option>
                                                                <option value="Medical Checkup">Medical Checkup</option>
                                                                <option value="Insurance">Insurance</option>
                                                                <option value="Education">Education</option>
                                                                <option value="Personal Expense">Personal Expense</option>
                                                                <option value="Pets">Pets</option>
                                                                <option value="Fitness">Fitness</option>
                                                                <option value="Gifts And Donations">Gifts And Donations</option>
                                                                <option value="Investments">Investments</option>
                                                                <option value="Loan Interest">Loan Interest</option>
                                                                <option value="Other Expenses">Other Expense</option>
                                                            </select> :
                                                                <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                    <option selected>Select Type First</option>
                                                                </select>)}

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
                <ExpenseReport mode={mode}/>
                <div style={{ float: "right" }}>
                    <label style={{color:color}}>Currency:</label> <select className="form-select select-lg" value={curr2} onChange={(e) => { setCurr2(e.target.value) }}>
                        <option selected>Select currency</option>
                        <option value="AFN">Afghan Afghani - ؋</option>
                        <option value="DZD">Algerian Dinar - دج</option>
                        <option value="ARS">Argentine Peso - $</option>
                        <option value="AMD">Armenian Dram - ֏</option>
                        <option value="AUD">Australian Dollar - $</option>
                        <option value="BSD">Bahamian Dollar - B$</option>
                        <option value="BHD">Bahraini Dinar - .د.ب</option>
                        <option value="BDT">Bangladeshi Taka - ৳</option>
                        <option value="BRL">Brazilian Real - R$</option>
                        <option value="GBP">British Pound Sterling - £</option>
                        <option value="BND">Brunei Dollar - B$</option>
                        <option value="CAD">Canadian Dollar - $</option>
                        <option value="CNY">Chinese Yuan - ¥</option>
                        <option value="COP">Colombian Peso - $</option>
                        <option value="HRK">Croatian Kuna - kn</option>
                        <option value="CZK">Czech Republic Koruna - Kč</option>
                        <option value="EUR">Euro - €</option>
                        <option value="HKD">Hong Kong Dollar - $</option>
                        <option value="INR">Indian Rupee - ₹</option>
                        <option value="IDR">Indonesian Rupiah - Rp</option>
                        <option value="IQD">Iraqi Dinar - د.ع</option>
                        <option value="ILS">Israeli New Sheqel - ₪</option>
                        <option value="JMD">Jamaican Dollar - J$</option>
                        <option value="JPY">Japanese Yen - ¥</option>
                        <option value="JOD">Jordanian Dinar - ا.د</option>
                        <option value="KWD">Kuwaiti Dinar - ك.د</option>
                        <option value="LBP">Lebanese Pound - £</option>
                        <option value="LYD">Libyan Dinar - د.ل</option>
                        <option value="MYR">Malaysian Ringgit - RM</option>
                        <option value="MUR">Mauritian Rupee - ₨</option>
                        <option value="MXN">Mexican Peso - $</option>
                        <option value="NPR">Nepalese Rupee - ₨</option>
                        <option value="NZD">New Zealand Dollar - $</option>
                        <option value="KPW">North Korean Won - ₩</option>
                        <option value="OMR">Omani Rial - .ع.ر</option>
                        <option value="PKR">Pakistani Rupee - ₨</option>
                        <option value="PHP">Philippine Peso - ₱</option>
                        <option value="PLN">Polish Zloty - zł</option>
                        <option value="QAR">Qatari Rial - ق.ر</option>
                        <option value="RUB">Russian Ruble - ₽</option>
                        <option value="SAR">Saudi Riyal - ﷼</option>
                        <option value="RSD">Serbian Dinar - din</option>
                        <option value="SGD">Singapore Dollar - $</option>
                        <option value="SOS">Somali Shilling - Sh.so.</option>
                        <option value="KRW">South Korean Won - ₩</option>
                        <option value="LKR">Sri Lankan Rupee - Rs</option>
                        <option value="SEK">Swedish Krona - kr</option>
                        <option value="CHF">Swiss Franc - CHf</option>
                        <option value="SYP">Syrian Pound - LS</option>
                        <option value="TZS">Tanzanian Shilling - TSh</option>
                        <option value="TND">Tunisian Dinar - ت.د</option>
                        <option value="TRY">Turkish Lira - ₺</option>
                        <option value="AED">United Arab Emirates Dirham - إ.د</option>
                        <option value="USD">US Dollar - $</option>
                    </select></div>
            </div>
            <div className="container">
                <table className="table my-5" style={{color:color}}>
                    <thead>
                        <tr>
                            <th scope="col">Transaction Id</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Expense Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Expense expenses={expenses} setExpenses={setExpenses} mul={mul} />
                    </tbody>
                </table>
            </div>

        </UserRoute>
    )
}

export default Body
