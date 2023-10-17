import React from 'react'
import { useContext } from 'react'
import { Link ,useHistory } from 'react-router-dom'
import { userContext } from '../context'
const Navbar = ({mode,toggleMode}) => {
  const history=useHistory();
  const [state,setState]=useContext(userContext);

  const logout=()=>{
    window.localStorage.removeItem('auth')
    setState(null);
    history.push('/login');
  }
  var color;
  if(mode==='light'){
    color='black'
  }
  else{
    color='white'
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/main">Expense Tracker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/main">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/budget">Budget</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/debt">Loan/Debt Management</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/manage">Manage Account</Link>
              </li>
            </ul>


            {state!==null ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div className={`btn-nav form-check form-switch text-${mode==='light'?'dark':'light'} mx-2 my-2`}>
                    <input className="form-check-input" onClick={toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                  </div>
                </li>
                <li>
                    <div className="btn-nav px-2 my-1.5">
                      <h5><span className={`badge bg-${mode==='light'?'light':'dark'} text-dark} `} style={{color:color}}>Hello, {state.user.name}</span></h5>
                    </div>
                </li>
                <li>
                    <div className="btn-nav">
                      <Link onClick={logout} className="btn btn-primary btn-sm navbar-btn" to="/login">Logout</Link>
                    </div>
                </li>
              </ul>
            ) : (
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <div className="btn-nav">
                      <Link className="btn btn-primary btn-sm navbar-btn mx-2 my-1" to="/register">Register</Link>
                    </div>
                </li>
                <li>
                    <div className="btn-nav">
                      <Link className="btn btn-primary btn-sm navbar-btn mx-2 my-1" to="/login">Login</Link>
                    </div>
                </li>
            </ul>
            )}

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
