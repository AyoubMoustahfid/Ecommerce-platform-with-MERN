import React, {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';

import {API_URL} from './../config'

import toastr from 'toastr';
import "toastr/build/toastr.css";

const Layout = ({ title, description, className, children }) => {

       const [adsence, setAdsence] = useState([])

       async function fetchData() {
        await axios.get(`${API_URL}/adsence/getAll/`)
         .then(response =>{
             const allAds = response.data
             setAdsence(allAds)
         }).catch(error =>{
             console.log(error);
         })
     }

      
 useEffect(() => {
    fetchData()
}, [])
    
    return (
        <div>
            <div className="jumbotron mt-5">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{description}</p>
            </div>
            <div className="container">
              <div className="row">
                 <div className="col-12">
                 <Carousel>
                 {adsence.map(ads => {
                         return <div className="carousel-ads-container-fluid" key={ads._id}>
                             <img alt="" src={`/uploads/${ads.picture}`} height="300px" width="100%"/>
                         </div>
                     })
                 }
             </Carousel>
                 </div>
              </div>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout
