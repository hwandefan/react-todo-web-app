import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OneCategory from '../../components/OneCategory'

const Categories = () =>{
    
    //ADD CATEGORY
    const [nameOfCategory,setNameOfCategory] = useState('');
    const [categories, setCategories] = useState([])
    const AddCategory = async () =>{
        const data = JSON.stringify({name: nameOfCategory})
        const config = {
            method: 'post',
            url: 'http://localhost:3000/api/categories/add',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
            await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location = "/categories"
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong")
            });

    }

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
                'Content-Type': 'application/json', 
            },
            data : ''
        };

        axios(config)
        .then(function (response) {
            if(response.data[0].name){for(let i of response.data)
            {
                setCategories(categories => [...categories, i]);
                
            }}
        })
        
        .catch(function (error) {
        console.log(error);
        });
    },[])

    return(
        <div className='row'>
            <div className='col-md-12 d-flex justify-content-center'> 
                <div>
                    <input name="name" placeholder="New category" onChange={e=> setNameOfCategory(e.target.value)} />
                    <button onClick={AddCategory} className="btn btn-success regButton">Add</button>
                        <ul>
                            {
                                categories.map((category, index)=>{
                                    return <OneCategory category={category} index={index} key={category._id} />
                                })
                            }
                        </ul>
                    <br />

                </div>
            </div>
        </div>
    )
}

export default Categories;