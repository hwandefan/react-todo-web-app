import React from 'react'
import axios from 'axios'
//One Todo View
function OneTodo({todo})
{
    let styles = {
        text: "Complete",
        ui: "btn btn-success"
    }
    const setCompleted = () =>{
        let data = JSON.stringify({title: todo.title, category: todo.category, date: todo.date, text: todo.text, completed: !todo.completed})
        const config = {
            method: 'put',
            url: `http://localhost:3000/api/posts/edit/${todo._id}`,
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            window.location = '/dash'
        })
        
        .catch(function (error) {
        console.log(error);
        });
        
    } 

        if(todo.completed)
        {
            styles.text = "Undo"
            styles.ui = "btn btn-danger"
        }
        else
        {
            styles.text = "Complete"
            styles.ui = "btn btn-success"
        }
       
    
    const href = `/info/${todo._id}`
    return (
         <div><a href={href}><button className="btn btn-primary">{todo.title}</button></a>
    <button onClick={setCompleted} className={styles.ui}>{styles.text}</button>
    <br /><br /> </div>)
}

export default OneTodo;