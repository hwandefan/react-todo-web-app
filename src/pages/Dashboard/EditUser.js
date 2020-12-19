import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Editing User Page function
const EditUser = () =>{
    if(localStorage.getItem('auth-token') === ''){
        window.location = "/"
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    useEffect(()=>{
        const config = {
            method: 'get',
            url: 'http://localhost:3000/api/user/',
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : ''
        };

        axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
        
        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])

    const postChanges = async () =>{
        let data = '';
        if(password !== 'defaultpassworddefaultpassword'){
            data = JSON.stringify({email: email, name: name, password: password })
        }
        else  data = JSON.stringify({email: email, name: name })
        const config = {
            method: 'put',
            url: 'http://localhost:3000/api/user/edit/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        await axios(config)
        .then(function (response){
            console.log('OK')
        })
    }

    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <h1 className='d-flex justify-content-center'>Edit</h1>
                    <h3>Name</h3>
                    <input name="name" placeholder="name" onChange={e => setName(e.target.value)} />
                    <br />
                    <h3>Email</h3>
                    <input name="email" placeholder="email"  onChange={e => setEmail(e.target.value)}/>
                    <h3>Password</h3>
                    <input name="password" placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
                    <br />
                    <button onClick={postChanges} className="btn btn-success">Save</button>
                    <a href="/"><button className="btn btn-danger regButton">Cancel</button></a>
                </div>
            </div>
        </div>
    )
}

export default EditUser;