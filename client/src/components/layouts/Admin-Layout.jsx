import { useAuth } from "../../store/auth";
import React from 'react'
import { FaUser } from "react-icons/fa";

import { Navigate, NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const {isLoading}=useAuth();
    const {user}=useAuth();
    console.log("admin layout",user);
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(!user.isAdmin){
        return <Navigate to="/" />;
    }


    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                  <NavLink to="/admin/users"><FaUser />
                                  Users</NavLink>
                            </li>
                            <li>  <NavLink to="/admin/contacts">Contacts</NavLink>
                            </li>
                            <li>  <NavLink to="/admin/services">Services</NavLink>
                            </li>
                            <li>  <NavLink to="/admin/home">Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>

    )
}

export default AdminLayout