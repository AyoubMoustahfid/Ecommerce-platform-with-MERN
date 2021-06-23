import React, { useState } from 'react'
import Layout from './../../core/Layout'

import { API_URL } from './../../config'

// import { isAuthenticated } from './../../auth/helpers'

import toastr from 'toastr';
import "toastr/build/toastr.css";



function AddAdsence() {

//    const { user, token } = isAuthenticated();




   const [pricing, setPricing] = useState("");
   const [picture, setPicture] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

    const submitAdsence = (e) => {
       
       e.preventDefault();

       const formData = new FormData();
       formData.append("picture", picture);
       formData.append("pricing", pricing);
       formData.append("startDate", startDate);
       formData.append("endDate", endDate);

       fetch(`${API_URL}/adsence/add`, {
           method: "POST",
           headers: {
               "Accept": "application/json"
           },

           body: formData
       })
       .then(res => res.json())
       .then(res => {
           if(res.error) {
               toastr.warning(res.error, 'Please Check form !', {
                   positionClass: "toast-bottom-left",
               })
           }
           else {
               toastr.success(`Adsence created`, 'new Adsence', {
                   positionClass: "toast-bottom-left",
               })

             
           }

       })
       .catch(err =>  toastr.error(err, 'Server error !', {
                   positionClass: "toast-bottom-left",
               }))
 
    }

    return (
        <div>
            <Layout 
              title="Product" 
              description="New product" 
              className="container"
           >
              
              <div className="row">
                  <div className="col-md-6 mx-auto">
                      <form onSubmit={submitAdsence}>

                       <div className="form-group">
                           <label htmlFor="picture">Photo Adsence</label>
                           <input  id="picture" onChange={(e) => setPicture(e.target.files[0])}  type="file" className="form-control-file" name="picture"  />
                       </div>

                       <div className="form-group">
                            <label htmlFor="pricing">Pricing Adsence</label>
                            <input  id="pricing" onChange={(e) => setPricing(e.target.value)}  value={pricing} type="number" className="form-control-file" name="pricing"  />
                       </div>

                       <div className="form-group">
                            <label htmlFor="startDate">Date Start</label>
                            <input  id="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} type="date" className="form-control-file" name="startDate"  />
                       </div>

                       <div className="form-group">
                            <label htmlFor="endDate">Date End</label>
                            <input id="endDate"  onChange={(e) => setEndDate(e.target.value)}  value={endDate} type="date" className="form-control-file" name="endDate"  />
                       </div>

                          <button className="my-5 btn-block btn btn-outline-primary">New Product</button>
                      </form>

                  </div>
              </div>
              
           </Layout>
        </div>
    )
}

export default AddAdsence