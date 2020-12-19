import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

//FULL Info about todo
const TodoInfo = () =>{
    
    let {id} = useParams();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [completed, setCompleted] = useState('')
    const [completeclass , setCompleteclass] = useState('')
    useEffect(()=>{
        if(localStorage.getItem('auth-token') === ''){
            window.location = "/"
        }else
        {
            axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
        }
        const config = {
                method: 'get',
                url: `http://localhost:3000/api/posts/id/${id}`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : ''
            };
            axios(config)
            .then(function  (response) {
                setTitle(response.data[0].title)
                setText(response.data[0].text)
                setDate(response.data[0].date)
                setCategory(response.data[0].category)
                if(response.data[0].completed)
                {
                    setCompleted('Done')
                    setCompleteclass('visibilityBtn')
                }
                else
                {
                    setCompleteclass('btn btn-success')
                    setCompleted('To Do')
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong")
            });
            
    })

   
    const DeleteButton = () =>{
        const config = {
            method: 'delete',
            url: `http://localhost:3000/api/posts/delete/${id}`,
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : ''
        };

        axios(config)
        .then(function (response) {
            window.location = "/dash"
        })
        
        .catch(function (error) {
        console.log(error);
        });
    }
    
    const completeTodo = () =>{
        let todoPostComplete = false;
        if(completed === 'Done') todoPostComplete = false;
        else todoPostComplete = true;
        let data = JSON.stringify({title: title, category: category, date: date, text: text, completed: todoPostComplete})
        const config = {
            method: 'put',
            url: `http://localhost:3000/api/posts/edit/${id}`,
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            window.location = `/info/${id}`
        })
        
        .catch(function (error) {
        console.log(error);
        });
    }
    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <p>{id}</p>
                    <p>{title}</p>
                    <p>{text}</p>
                     <p>{date}</p> 
                    <p>{category}</p>
                     <p>{completed}</p>
                     <button onClick={completeTodo} className={completeclass}>Complete</button> 
                    <button onClick={DeleteButton} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TodoInfo;