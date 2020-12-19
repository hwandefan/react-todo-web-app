import React from 'react';
import Main from './components/Main'
import './index.css'
import './css/bootstrap.css'
function App() {
  let btnLogStyle=''
  let btnLogText=''
  let btnLogSettings = ''
  let btnLogCategories=''
  if(localStorage.getItem('auth-token') !==''){
    btnLogStyle="btn btn-danger my-2 my-sm-0"
    btnLogText='LOGOUT'
    btnLogSettings="btn btn-info my-2 my-sm-0 settingsButton"
    btnLogCategories="btn btn-warning my-2 my-sm-0 settingsButton"
  }
  else{
    btnLogStyle="btn btn-success my-2 my-sm-0"
    btnLogText='SIGN IN'
    btnLogSettings='visibilityBtn'
    btnLogCategories="visibilityBtn"
  }

  const LogOutFunc = async () =>{
    if(localStorage.getItem('auth-token') !==''){
      localStorage.setItem('auth-token','')
      window.location = "/"
    }
    else{
      window.location = "/"
    }
  }
  return (
    <div>
        <nav className="navbar navbar-dark bg-dark">
          <a href='/' className="navbar-brand">Todo Online System</a>
          <div>
            <a href="/add"><button className={btnLogCategories}>Add Todo</button></a>
            <a href="/categories"><button className={btnLogCategories}>Manage Categories</button></a>
            <a href="/edit_user"><button className={btnLogSettings}>Edit Profile</button></a>
            <button onClick={LogOutFunc} className={btnLogStyle}>{btnLogText}</button>
            
          </div>
         
        </nav>
      <div className='container-fluid'>
        <Main />
      </div>
    </div>
  );
}
export default App;