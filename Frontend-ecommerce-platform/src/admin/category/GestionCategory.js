import React, { useState , useEffect}from 'react'

import {API_URL} from "./../../config"
import {isAuthenticated} from './../../auth/helpers'
import Layout from './../../core/Layout'

import toastr from 'toastr';
import "toastr/build/toastr.css";

function GestionCategory(){

    
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("")
    const [name, setName] = useState("")
     

    const handleChange = e => {
        setName(e.target.value)
    }
    // =============== PUT ONE CATEGORY =================
    const updateCategory = (e) => {
        e.preventDefault();

        const {user, token} = isAuthenticated();
        const category = localStorage.getItem('category')

        const categoryParse = JSON.parse(category)

        console.log(categoryParse._id);

    
        fetch(`${API_URL}/category/update/${categoryParse._id}/${user._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        }).then(res => res.json())
          .then(res => {

            console.log(res);
              if(res.error){
                  toastr.warning(res.error, 'Please Check your form !!', {
                      positionClass: "toast-bottom-left",
                  })
              }else{
                toastr.success(`Category ${name} is Updated`, 'Update is Successfully', {
                      positionClass: "toast-bottom-left",
                })
                  localStorage.removeItem('category')
                  setName('')
              }
          })
    }
    // =============== GET CATEGORY BY ID =================
    const categoryById = id => {
        fetch(`${API_URL}/category/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(res => {
              localStorage.setItem("category", JSON.stringify(res.category))
              setCategoryId(res.category)
          })
          .catch(err => console.error(err))
    }

    // =============== DELETE ALL CATEGORY =================
    const deleteCategory = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/category/delete/${id}/${user._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
          .then(res => {
                toastr.success('This category is deleted successfully', 'Delete is successful', {
                    positionClass: "toast-bottom-left",
                })
          }).catch(err => toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
            }))
    }
    
    // =============== GET ALL CATEGORY =================
    const getCategories = () => {
        
       fetch(`${API_URL}/category`, {
           method: "GET",
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => setCategories(res.categories))
        .catch(err => console.error(err))
        
    }
    
    
    useEffect(() => getCategories(), [])

    return (
        <Layout 
               title="Gestion Category Page" 
               description="Node React bEcommerce App" 
               className="container mt-5"
            >
            <div className="row mt-5">
                <div className="col-12">
                <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
         {categories && categories.map((item, i) => (
            <tr key={i}>
                <th>{item.name}</th>
                <td>
                    <div className="row">
                        <div className="col-6">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => categoryById(item._id)}>
                            EDIT
                            </button>

                            <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={updateCategory}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name Category</label>
                                                <input type="text" className="form-control" id="name" defaultValue={categoryId.name || ''}  placeholder="Update Name" onChange={handleChange}/>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-danger" onClick={() => deleteCategory(item._id)}>Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
         ))}
         
        </tbody>
      </table> 
                </div>
            </div>
        </Layout>
    )
}

export default GestionCategory;