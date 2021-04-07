import React, {useState, useEffect} from 'react'
import {isAuthenticated} from './../../auth/helpers'
import moment from "moment"
import {listOfOrders, getStatus, updateOrderStatus} from './../ApiAdmin'
import Layout from "./../../core/Layout"

function ListOrders() {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([])
    
    const {user, token} = isAuthenticated();

    const loadOrders = (user, toekn) => {
        listOfOrders(user._id, toekn)
             .then(res => {
                 console.log(res);
                 setOrders(res)
             })
             .catch(err => console.error(err))
    }

    const loadStatus = (user, toekn) => {
        getStatus(user._id, toekn)
             .then(res =>  setStatus(res.status))
             .catch(err => console.error(err))
    }

    
    useEffect(() => {

        loadOrders(user, token)
        loadStatus(user, token)
    } , [])


    const notOrders = () => {
        if(orders.length === 0){
            return (
                <div className="alert alert-warning text-center my-5">
                     Not Orders Yet !
                </div>
            )
        }else{
            return (
                <div className="alert alert-info text-center my-5">
                     Total Orders {orders.length}
                </div>
            )
        }
    }

    const showInput = (key, value) => {
          return (
              <div className="form-group my-3">
                 <label htmlFor={key}>{key}</label>
                 <input id={key} value={value} readOnly type="text" className="form-control"/>
              </div>
          )
    }

    const handleStatus = (e, order) => {
        console.log(e.target.value);
        updateOrderStatus(user._id, token, order._id, e.target.value)
               .then((res) => {
                   if(res.error){
                       console.log(res.error);
                   }

                   loadOrders(user, token)
                   console.log(res);
               })
    }


  const showStatus = (order) => {
      return status.length && (

        <div>
          <h4> Status: {order.status}</h4>
          <select onChange={e => handleStatus(e, order)} className="form-control">
             <option value="">Select Status</option>
             {status.map(s => (
                 <option key={s} value={s}>{s}</option>
             ))}
          </select>
        </div>
      )
  }

    const showOrders = () => {
        return orders.length && orders.map(order => (
            <div className="my-3" key={order._id}>
             <ul className="list-group">
                <li className="list-group-item active"><strong>Transact ID</strong> {order.transaction_id}</li>
                <li className="list-group-item">{showStatus(order)}</li>
                <li className="list-group-item"><strong>Amount</strong> {order.amount} DH</li>
                <li className="list-group-item"><strong>Ordered On</strong> {moment(order.createdAt).fromNow()}</li>
                <li className="list-group-item"><strong>Customer</strong> {order.user.name}</li>
                <li className="list-group-item"><strong>Delivery Address</strong> {order.address}</li>
             </ul>

             <div className="my-5">

                 <h3 className="alert alert-success text-center my-3 mx-auto">Total Products {order.products.length}</h3>
                {order.products.map(product => (
                    <div key={product._id} className="card text-write bg-primary mb-3">
                       <div className="card-header">{product.name}</div>
                       <div className="card-body">
                          { showInput('Product ID', product._id)}
                          { showInput('Product Name', product.name)}
                          { showInput('Product Price', product.price)}
                          { showInput('Product quantity', product.count)}
                       </div>
                    </div>
                ))}
             </div>
            </div>
        ))
    }
    return (
        <div>
        <Layout 
        title="Orders" 
        description="New Orders" 
        className="container"
     >
        
        <div className="row">
            <div className="col-md-12">
               {notOrders()}
               {showOrders()}
            </div>
        </div>
        
     </Layout>
        </div>
    )
}

export default ListOrders
