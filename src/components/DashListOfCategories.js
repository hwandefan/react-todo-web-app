import React from 'react'
//List of Categories
function DashListOfCategories({category , getTodos})
{
    return <div><button onClick={()=>getTodos(category.name)} className="btn btn-primary">{category.name}</button><br /><br /></div>
}

export default DashListOfCategories;