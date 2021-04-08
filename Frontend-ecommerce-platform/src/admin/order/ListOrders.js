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
                 <p id={key}>{value}</p>
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
            
            <h3 className="alert alert-success text-center my-3 mx-auto">Total Products {order.products.length}</h3>
            <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Transact ID</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
                <th scope="col">Ordered On</th>
                <th scope="col">Customer</th>
                <th scope="col">Delivery Address</th>
              </tr>
            </thead>
            <tbody>
            <tr key={order._id}>
                <th>{order.transaction_id}</th>
                <td>{showStatus(order)}</td>
                <td>{order.amount} DH</td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td>{order.user.name}</td>
                <td>{order.address}</td>
              </tr>
            
            </tbody>
          </table>
           

             <div className="my-5">

                
                 <table className="table table-bordered">
                 <thead>
                   <tr>
                     <th scope="col">Product Name</th>
                     <th scope="col">Product ID</th>
                     <th scope="col">Product Price</th>
                     <th scope="col">Product quantity</th>
                   </tr>
                 </thead>
                 <tbody>
                 {order.products.map(product => (
                 <tr key={product._id}>
                     <th>{product.name}</th>
                     <td>{ showInput( product._id)}</td>
                     <td>{ showInput( product.price)}</td>
                     <td>{ showInput( product.count)}</td>
                     
                   </tr>
                   ))}
                 </tbody>
               </table>
                
             </div>
             <hr/>
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
