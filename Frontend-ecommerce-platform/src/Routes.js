import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Shop from './core/Shop';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Dashboard from './user/Dashboard';
import AdminDashboard from './user/AdminDashboard';
import SellerDashboard from './user/SellerDashboard';
import SuperAdminDashboard from './user/SuperAdminDashboard';
import Menu from './core/Menu';

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import SellerRouter from './auth/SellerRouter'
import SuperAdminRouter from './auth/SuperAdminRouter'
import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import ListOrders from './admin/order/ListOrders'
import Product from './core/Product'
import Adsence from './core/Adsence'
import ValidationSeller from './core/ValidationSeller'
import ValidationAdmin from './core/ValidationAdmin'

import Cart from './core/Cart'

const Routes = () => {
    return (
        <BrowserRouter>
           <Menu />
            <Switch>
                <PrivateRoute path='/' exact component={Home} />
                <PrivateRoute path='/shop' exact component={Shop} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />

                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/admin/order' exact component={ListOrders} />
                <AdminRoute path='/admin/adsence' exact component={Adsence} />
                <AdminRoute path='/admin/validation_seller' exact component={ValidationSeller} />

                <SuperAdminRouter path='/super_admin/dashboard' exact component={SuperAdminDashboard} />
                <SuperAdminRouter path='/super_admin/validation_admin' exact component={ValidationAdmin} />

                <SellerRouter path='/seller/dashboard' exact component={SellerDashboard} />
                <SellerRouter path='/product/create' exact component={AddProduct} />

                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/product/:id' exact component={Product} />
            </Switch>
        
        </BrowserRouter>
    )
}

export default Routes
