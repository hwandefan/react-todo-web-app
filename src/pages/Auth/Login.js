import React, {useState} from 'react'
import axios from 'axios'
const Login = () =>{
//Login page function
    if(localStorage.getItem('auth-token') !== ''){
        window.location = "/dash"
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const postLogin = () => {

        const data = JSON.stringify({email: email, password: password })
        if(email ==='' || password==='')
        {
            alert("User doesn't exist")
            return
        }
        
        const config = {
        method: 'post',
        url: 'http://localhost:3000/api/user/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            localStorage.setItem('auth-token', response.data);
            axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
            window.location = "/dash"
        })
        .catch(function (error) {
            console.log(error);
            alert("User doesn't exist")
        });
    }

    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <h1 className='d-flex justify-content-center'>Login</h1>
                    <br />
                    <h3>Email</h3>
                    <input name="email" placeholder="email" onChange={e=> setEmail(e.target.value)}  />
                    <h3>Password</h3>
                    <input name="password" placeholder="password" onChange={e=> setPassword(e.target.value)} type="password"  />
                    <br />
                    <button type="submit" className='btn btn btn-outline-success' onClick={postLogin}>SIGN IN</button>
                    <a href='/signup'><button className='btn btn-outline-success regButton'>REGISTER</button></a>
                </div>
            </div>
        </div>
    )
}

export default Login;
