import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Layout from './../core/Layout'

import { isAuthenticated } from './../auth/helpers'

import {API_URL} from './../config'

function SellerDashboard() {

    const { user: { name, email, role, priceTotale, productTotal, _id } } = isAuthenticated()
   const [seller, setSeller] = useState('')

   useEffect(() => {
       fetch(`${API_URL}/find/${_id}`, {
           method: 'GET'
       }).then(res => res.json())
         .then(res => {
             console.log(res.user[0].productTotal);
             setSeller(res.user[0])
         })
   }, [])

    const adminInfo = () => {

        return (

            <div className="card">
                            <div className="card-body">
                                <h2 className="card-header">User INFORMATION</h2>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{name}</li>
                                    <li className="list-group-item">{email}</li>
                                    <li className="list-group-item">Price Total :{priceTotale}</li>
                                    <li className="list-group-item">Product Total : {seller.productTotal}</li>
                                    <li className="list-group-item">{role ? 'Seller' : 'User'}</li>
                                </ul>
                            </div>
                        </div>
        )
    }


    const adminLinks = () => {

        return (
            <div className="card">
                            <div className="card-body">
                                <h2 className="card-header">User Links</h2>
                                <ul className="list-group list-group-flush">
                                  
                                    <li className="list-group-item">
                                        <Link className="nav-link" to="/product/create">Create product</Link>
                                    </li>

                                 
                                </ul>
                            </div>
                        </div>
        )
    }

    return (
        <Fragment>
            <Layout
                title="Dashboard"
                description={`Welcome, ${ name }`}
                className="container"
            >

                <div className="row">
                    <div className="col-md-4">
                        {adminLinks()}
                    </div>
                    <div className="col-md-8">
                        {adminInfo()}
                       
                    </div>

                 
                </div>

            </Layout>
        </Fragment>
    )
}

export default SellerDashboard
