import React, {useEffect, useState} from 'react'
import axios from 'axios'
import DashListOfCategories from '../../components/DashListOfCategories'
import OneTodo from '../../components/OneTodo'


//DashBoard Page Function
const Dash = () =>{

    const [todos, setTodos] = useState([])
    const [categories, setCategories] = useState([])
    
    const getTodos = async (id) =>
    { 
        
        if(id === 'Primary')
        {
            let todoArr = []
            const config = {
                method: 'get',
                url: 'http://localhost:3000/api/posts',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : ''
                };
                axios(config)
                .then(function (response) {
                    if(response.data[0].title){
                        for(let i of response.data)
                        {
                            if(i.category === id)
                            {  

                                //setTodos(todos => [...todos, i]); 
                                todoArr.push(i)
                            }
                        }
                         setTodos(todoArr)
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Something went wrong")
                });
        }
        else
        {
            let todoArr = []
            const config = {
                method: 'get',
                url: 'http://localhost:3000/api/posts',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : ''
                };
                axios(config)
                .then(function (response) {
                    if(response.data[0].title){
                        for(let i of response.data)
                        {
                            if(i.category === id) todoArr.push(i)
                            
                        }
                        setTodos(todoArr); 
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Something went wrong")
                });
        }
    }
        useEffect(() => {
            if(localStorage.getItem('auth-token') === ''){
                window.location = "/"
            }else
            {
                axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
            }
            const configCat = {
                method: 'get',
                url: 'http://localhost:3000/api/categories',
                headers: { 
                    'Content-Type': 'application/json', 
                },
                data : ''
            };

            axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')

            axios(configCat)
            .then(function (response) {
            //console.log(JSON.stringify(response.data));
            if(response.data[0].name){ for(let i of response.data)
                {
                    setCategories(categories => [...categories, i]);
                }
            }
            })
            .catch(function (error) {
            console.log(error);
            });

            const configTodo = {
                method: 'get',
                url: 'http://localhost:3000/api/posts',
                headers: { 
                    'Content-Type': 'application/json', 
                },
                data : ''
            };

            let todoArr = []
            axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
            axios(configTodo)
            .then(function (response) {
            if(response.data[0].title){ for(let i of response.data)
                {
                    todoArr.push(i)
                }
                setTodos(todoArr)
            }
            })
            .catch(function (error) {
            console.log(error);
            });


        },[])
    return(
        <div className='row'>
            <div className='col-md-6 d-flex justify-content-center'> 
                <div>
                    <h1>To do's</h1>
                    {
                        todos.map((todo)=>{
                            return <OneTodo todo={todo} key={todo._id} />
                        })
                    }
                </div>
            </div>
            <div className='col-md-6 d-flex justify-content-center'> 
                <div>
                <h1>Categories</h1>
                    <button onClick={()=>getTodos('Primary')} className="btn btn-primary">Primary</button> <br /> <br /> 
                    {
                        categories.map((category)=>{
                            return <DashListOfCategories category={category} key={category._id} getTodos={getTodos} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dash;