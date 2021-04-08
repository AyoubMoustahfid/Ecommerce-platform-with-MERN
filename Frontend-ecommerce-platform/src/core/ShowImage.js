import React from 'react'
import { API_URL } from './../config';

const  ShowImage = ({ item, url, className, height }) => {
    return (
        <div>
            <img className={className} src={`${API_URL}/${url}/${item._id}`} alt={`${item.name}`} height={height}/>
        </div>
    )
}

export default ShowImage  
