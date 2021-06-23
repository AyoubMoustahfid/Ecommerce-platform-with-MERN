import React from 'react'
import { API_URL } from './../config';

const  ShowImage = ({ item, url, className, height, width, classDiv }) => {
    return (
        <div className={classDiv}>
            <img className={className} src={`${API_URL}/${url}/${item._id}`} alt={`${item.name}`} height={height} width={width}/>
        </div>
    )
}

export default ShowImage  
