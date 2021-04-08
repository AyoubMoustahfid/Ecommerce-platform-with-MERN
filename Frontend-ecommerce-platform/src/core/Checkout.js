import React, {useState, useEffect} from 'react'
import {isAuthenticated, emptyCart} from "./../auth/helpers"
import {getBrainTreeToken, procesPayment, createOrder} from './ApiCore'
import DropIn from "braintree-web-drop-in-react";
import { Link , useHistory} from 'react-router-dom'

import toastr from 'toastr';
import "toastr/build/toastr.css";
 

const Checkout = ({products}) => {
    let history = useHistory();

    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {},
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    useEffect(() => {
        console.log('userID, token', userId, token)
        getBrainTreeToken(userId, token)
        .then(res => setData({ ...data, braintreeToken: res.token }))
        .catch(err => setData({ ...data, error: err }))
    }, [])

    const totalToCheckout = (products) => {
        return products.reduce((total, product) => total + (product.count * product.price), 0)
    }

  
    const dropIn = () => {
         
        return (
            <div>
            { data.braintreeToken !== null && products.length > 0 && (
                 <DropIn options={{
                   authorization: data.braintreeToken,
                   paypal: {
                       flow: "vault"
                   }
                 }}
                 onInstance={(instance) => (data.instance = instance)}
                 />
             )}
            </div> 
        )

    }
       
   
    const buy = () => {

        const delivryAddress = data.address

        data.instance.requestPaymentMethod()
            .then(data => {

               let paymentData = {
                   amount: totalToCheckout(products),
                   paymentMethodNonce: data.nonce
               }

               procesPayment(userId, token, paymentData)
                   .then(res => {
                       console.log(res);


                       let orderData = {
                           products, 
                           transaction_id : res.transaction.id,
                           amount: res.transaction.amount,
                           address: delivryAddress
                       }
                       createOrder(userId, token, orderData)
                           .then(res => console.log(res))
                           .catch(err => console.log(err))

                       emptyCart(() => {
                           toastr.success("Valid", 'Thank you for Payment was Successfully', {
                               positionClass: "toast-bottom-left",
                           })

                       })

                  

                   }).catch(err => {
                    toastr.error("inValid", err.message, {
                        positionClass: "toast-bottom-left",
                    })
                   })

            }).catch(err => {
                toastr.error("inValid", err.message, {
                    positionClass: "toast-bottom-left",
                })
            })
    }

   
    const showBtnToCheckout = () => {
        if(isAuthenticated()) {
            return (
                <div>
                 { dropIn() }
                <button onClick={buy} className="btn btn-raised btn-success btn-block">Buy</button>
                </div>
            )
        }
        return (
            <Link to="/singnin">
               <button className="btn btn-raised btn-warning btn-block">Sign to Checkout</button>
            </Link>
        )
    }

   
    const handleInput = e => {
        setData({...data, address: e.target.value})
    }
    return (
        <div>
            <h2 className="text-center">Total : <span className="badge badge-success">{totalToCheckout(products).toString().substring(0, 7)}</span> </h2>
            <label  htmlFor="address">Delivered Address</label>
            <textarea className="form-control" onChange={handleInput} rows="2"></textarea>
            {showBtnToCheckout()}
        </div>
    )
}

export default Checkout