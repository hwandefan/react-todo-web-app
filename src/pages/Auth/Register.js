import React, {useState} from 'react';
//Register Page Function
const Register =() =>{
    if(localStorage.getItem('auth-token') !== ''){
        window.location = "/dash"
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const postData = () =>{
        if(password1 !== password2){
            alert('WRONG PASSWORD')
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password1 })
        };
        fetch('http://localhost:3000/api/user/register', requestOptions)
            .then(response => response.json()).then(window.location ='/')
    }

    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <h1 className='d-flex justify-content-center'>Register</h1>
                        <h3>Enter your name</h3>
                        <input name="name" onChange={e=> setName(e.target.value)} />
                        <h3>Enter your email</h3>
                        <input name="email" onChange={e=> setEmail(e.target.value)} />
                        <h3>Enter your password</h3>
                        <input name="password1" type="password" onChange={e=> setPassword1(e.target.value)} />
                        <h3>Repeat your password</h3>
                        <input name="password2" type="password" onChange={e=> setPassword2(e.target.value)} />
                        <br />
                        <button type="submit " className='btn btn btn-outline-success' onClick={postData} >REgister</button>
                </div>
            </div>
        </div>
    )
}

export default Register;