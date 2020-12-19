import React from 'react'
import axios from 'axios'
//One category view
function OneCategory({category, index})
{
    function deleteCategory(id)
    {
        const config = {
            method: 'delete',
            url: `http://localhost:3000/api/categories/delete/${id}`,
            headers: { 
                'Content-Type': 'application/json', 
            },
            data : ''
        };

        axios(config)
        .then(function (response) {
            window.location = "/categories"
        })
        
        .catch(function (error) {
        console.log(error);
        });
    }
    return(
    <li>{category.name}<button onClick={()=>deleteCategory(category._id)} className="btn btn-danger">Delete</button></li>
    )
}

export default OneCategory;