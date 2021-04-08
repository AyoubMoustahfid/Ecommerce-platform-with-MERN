import React, { useState, useEffect } from 'react'
import Layout from './../../core/Layout'

import { API_URL } from './../../config'

import { isAuthenticated } from './../../auth/helpers'

import toastr from 'toastr';
import "toastr/build/toastr.css";



function AddAdsence() {

   const { user, token } = isAuthenticated();




    const [photo, setPhoto] = useState({
        photo: ''
    })

    
    const [formData, setFormData] = useState(new FormData()); 


    const handleChange = (e) => {

       const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;

       formData.set(e.target.id, value)

       setPhoto({...photo, [e.target.id]: value})
       
    }


    const submitAdsence = (e) => {
       
       e.preventDefault();

       fetch(`${API_URL}/adsence/create/${user._id}`, {
           method: "POST",
           headers: {
               "Accept": "application/json",
               "Authorization": `Bearer ${token}`
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

               setPhoto({
                   photo: ''
               })
                
               
               setFormData(new FormData())
              

              

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
                           <label htmlFor="photo">Photo Adsence</label>
                           <input onChange={handleChange} id="photo" type="file" className="form-control-file" name="photo"  />
                       </div>

                          <div className="col-12">
                          { JSON.stringify(photo) }
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