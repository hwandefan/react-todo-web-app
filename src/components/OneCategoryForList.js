import React from 'react'

function OneCategoryForList({category, index})
{
    console.log("Hello")
    const val = `${category.name}`
    return(
        <option value={val}>{val}</option>
    )
}

export default OneCategoryForList;