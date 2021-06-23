import React, {useState, useEffect} from 'react'


import {API_URL} from "./../../config"
import {isAuthenticated} from './../../auth/helpers'
import Layout from './../../core/Layout'
import ShowImage from './../../core/ShowImage'

import toastr from 'toastr';
import "toastr/build/toastr.css";


function GestionProduct() {

    const { user, token } = isAuthenticated();

    const [product, setProduct] = useState("")

    const [productId, setProductId] = useState({})

    const [productUpdate, setProductUpdate] = useState({
        photo: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0
    })
    
    const [formData, setFormData] = useState(new FormData()); 


    const handleChange = (e) => {

        const value = e.target.id === 'photo' ? e.target.files[0] : e.target.defaultValue;
 
        formData.set(e.target.id, value)
 
        setProductUpdate({...productUpdate, [e.target.id]: value})
        
     }
 
     const productById = async  (id) => {
          await fetch(`${API_URL}/product/${id}`, {
             method: 'GET',
             headers: {
                 "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then( res => {
                localStorage.setItem("product", JSON.stringify(res.product))
                 setProductId(res.product)
            }).catch(err => console.error(err))
    }
        
    const getProducts =  () => {
            return  fetch(`${API_URL}/product`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setProduct(res.products)
            })
            .catch(err => console.error(err))
            
    }



    useEffect( () => {getProducts()}, [])

    console.log(productId);

       
     const updateProduct =  e => {
         e.preventDefault()
         const productStorage = JSON.parse(localStorage.getItem('product'))

         fetch(`${API_URL}/product/update/${productStorage._id}/${user._id}`, {
             method: 'PUT',
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": `Bearer ${token}`
             },
             body: formData
         }).then(res => res.json())
           .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }else {

                toastr.success('Product is Updated', 'Update is Done', {
                    positionClass: "toast-bottom-left",
                })

                console.log(res.product);
                setProductUpdate(res.product)
                
                setFormData(new FormData())

            }   
           }).catch(err =>  toastr.error(err, 'Server error !', {
                            positionClass: "toast-bottom-left",
            }))
     }


     const deleteProduct = id => {
        const {user, token} = isAuthenticated();
         fetch(`${API_URL}/product/delete/${id}/${user._id}`, {
             method: 'DELETE',
             headers: {
                'Authorization': `Bearer ${token}`
             }
         }).then(res => {
             console.log(res);
            toastr.success('This Product is deleted successfully', 'Delete is successful', {
                positionClass: "toast-bottom-left",
            })
      }).catch(err => toastr.error(err, 'Server error !', {
                positionClass: "toast-bottom-left",
        }))
     }

    return (
        <Layout
            title="Gestion Product Page" 
            description="Node React bEcommerce App" 
            className="container-fluid mt-5"
        >
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sold</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <div className="row justify-content-center">
                                        <ShowImage item={item} url="product/photo" classDiv="col-12 mx-auto" height="100px"></ShowImage>
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description.substring(0, 50)} ....</td>
                            <td>{item.quantity} Item</td>
                            <td>{item.price} DH</td>
                            <td>{item.sold}</td>
                            <td>
                                <div className="row">
                                    <div className="col-6">

                                        <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick={() => productById(item._id)}>Edit</button>

                                        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={updateProduct}>

                                                            <div className="form-group">
                                                                <label htmlFor="photo">Update Photo</label>
                                                                <input id="photo" type="file" className="form-control" name="photo" onChange={handleChange} defaultValue={productId.photo || ''}/>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="name">Update Name</label>
                                                                <input type="text" className="form-control" id="name" name="name"  defaultValue={productId.name || ''} onChange={handleChange}/>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="description">Update Description</label>
                                                                <textarea type="text" rows="4" className="form-control" name="description" id="description"  defaultValue={productId.description || ''} onChange={handleChange}></textarea>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="price">Update Price</label>
                                                                <input type="number" className="form-control" id="price" name="price" defaultValue={productId.price || ''} onChange={handleChange}/>
                                                            </div>
                                                            
                                                            <div className="form-group">
                                                                <label htmlFor="quantity">Update Quantity</label>
                                                                <input type="number" className="form-control" id="quantity" name="quantity" defaultValue={productId.quantity} onChange={handleChange}/>
                                                            </div>

                                                            <button className="btn btn-primary btn-block">Submit</button>

                                                            {JSON.stringify(productUpdate)}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-danger" onClick={() => deleteProduct(item._id)}>Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default GestionProduct
