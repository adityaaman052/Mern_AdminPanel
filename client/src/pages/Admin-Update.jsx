import { useAuth } from "../store/auth"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";




const AdminUpdate = () => {
    const [data,setData]=useState({
        username:"",
        email:"",
        phone:"",
    });
    const params=useParams();
    console.log("params single user: ",params);
    const {authorizationToken} =useAuth();

    //get single user data
    const getSingleUserData=async () =>{
        try{
            const response=await fetch(
                `http://localhost:5000/admin/users/${params.id}`,
                {
                    method:"GET",
                    headers:{
                        Authorization: authorizationToken,
                    },
                }
            );
            const data=await response.json();
            console.log(`users single data: ${data}`);
            setData(data);
        }
        catch(error){
            console.log(error);

        }
    };
    useEffect(()=>{
        getSingleUserData();
    },[]);
    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setData({
            ...data,
            [name]:value,
        });
    };
    //to update the data dynamically
    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            const response=await fetch(
                `http://localhost:5000/admin/users/update/${params.id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: authorizationToken,
                    },
                    body:JSON.stringify(data),
                }
            );
            if(response.ok){
                toast.success("Udpdated user successfully");
            }
            else{
                toast.error("Not Updated successfully");
            }
            
        }
        catch(error){
            console.log(error);

        }
    }
  return (
    <section className="section-contact">
        <div className="contact-content container">
            <h1 className="main-heading">Update User data</h1>
        </div>
        <div className="container grid grid-two-cols">
            <section className="section-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">username</label>
                        <input
                         type="text" 
                         name="username"
                         id="username"
                         autoComplete="off"
                         value={data.username}
                         onChange={handleInput}
                         required
                         />
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input
                         type="email" 
                         name="email"
                         id="email"
                         autoComplete="off"
                         value={data.email}
                         onChange={handleInput}
                         required
                         />
                    </div>
                    <div>
                        <label htmlFor="phone">Mobile</label>
                        <input
                         type="phone" 
                         name="phone"
                         id="phone"
                         autoComplete="off"
                         value={data.phone}
                         onChange={handleInput}
                         required
                         />
                    </div>
                    
                   <div>
                    <button type="submit">Update</button>
                   </div>
                </form>
            </section>

        </div>
    </section>

)
}

export default AdminUpdate