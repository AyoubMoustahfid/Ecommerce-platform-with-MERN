import React, {useState, useEffect} from 'react'
import {API_URL} from './../config'
import {isAuthenticated} from "./../auth/helpers"
import axios from "axios"
import Layout from "./../core/Layout"

import toastr from 'toastr';
import "toastr/build/toastr.css";

function ValidationAdmin() {
    
    const [users, setUsers] = useState();
    

    const activeAdmin = id => {
        const {user, token} = isAuthenticated();

        fetch(`${API_URL}/validationAdmin/${id}/${user._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        }).then(res => res.json())
          .then(res => {
            if(res.error){
                toastr.warning(res.error, 'Admin not found with id !', {
                    positionClass: "toast-bottom-left",
                })
                console.log('error');
             }else{
                toastr.success(res.error, 'this Account is Activated', {
                    positionClass: "toast-bottom-left",
                })
             }
          })

    }

    useEffect(() => {
        const {user, token} = isAuthenticated();

        axios.get(`${API_URL}/all_user/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setUsers(res.data.users)
        })
           
    })

    return (
        <div>
        <Layout title="Validation Admin Page" 
        description="Node React Ecommerce App" 
        className="container">

        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
         {users && users.map((item, i) => (
            <tr key={item._id}>
            <th>{item.name}</th>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
                <button className="btn btn-primary btn-block" onClick={() => activeAdmin(item._id)}>Admin</button>
            </td>
          </tr>
         ))}
        
        </tbody>
      </table>
        </Layout>
        </div>
    )
}

export default ValidationAdmin
