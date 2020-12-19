import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import OneCategoryForList from '../../components/OneCategoryForList'
//Add Todo page Function
const AddTodo = () =>{
    const [listOfCategories, setLiestOfCategories] = useState(new Array(0));

    useEffect(()=>{
        if(localStorage.getItem('auth-token') === ''){
            window.location = "/"
        }else
        {
            axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
        }
        const config = {
            method: 'get',
            url: 'http://localhost:3000/api/categories',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : ''
            };
            axios(config)
            .then(function (response) {
                if(response.data[0].name){ for(let i of response.data)
                {
                    setLiestOfCategories(listOfCategories => [...listOfCategories, i]);   
                }}
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong")
            });
    },[])

    const [title, setTitle] = useState('');
    const [text , setText] = useState('');
    const [category, setCategory] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const AddTodo = () =>
    {
        const data = JSON.stringify({title: title, text:text, category:category, date: startDate})
        const config = {
            method: 'post',
            url: 'http://localhost:3000/api/posts/add',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
            axios(config)
            .then(function (response) {
                window.location = '/dash'
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong")
            });
    }

    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <h3>Title</h3>
                    <input name="title" onChange={e=> setTitle(e.target.value)} />
                    <h3>Text</h3>
                    <textarea name="text" onChange={e=>setText(e.target.value)}></textarea>
                    <h3>Date</h3>
                        <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        isClearable
                        placeholderText="Pick date"
                        />
                    <h3>Category</h3>
                    <select name="category" onChange={e=> setCategory(e.target.value)}>
                        <option value="Primary">-</option>
                        {
                                listOfCategories.map((categ)=>{
                                    return <OneCategoryForList category={categ} key={categ._id} />
                                })
                        }
                    </select>
                    <br />
                    <button className="btn btn-success" onClick={AddTodo}>Add Todo</button>
                </div>
            </div>
        </div>
    )
}

export default AddTodo