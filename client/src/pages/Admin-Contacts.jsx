import { toast } from "react-toastify";
import { useAuth } from "../store/auth"
import React, { useEffect, useState } from 'react'


const AdminContacts = () => {
    const {authorizationToken}=useAuth();
    const [contactData, setContactData] = useState([]);

    const getContactsData=async()=>{
        try{
        const response=await fetch("http://localhost:5000/admin/contacts",{
            method:"GET",
            headers:{
                Authorization:authorizationToken,

            },
        });
        const data=await response.json();
        console.log("contact data", data);
        if(response.ok){
            setContactData(data);
            console.log(response);
        }
    }
    catch(error){
        console.log(error);
    }
    }
    //deleteContact data by id
    const deleteContactById=async (id)=>{
        try{
            const response= await fetch(`http://localhost:5000/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            const data=await response.json();
            console.log(`users after delete: ${data}`);
            if(response.ok){
                getContactsData();
                toast.success("deleted successfully");
            }
            else{
                toast.error("Not deleted ")
            }

        }
        catch(error){
            console.log(error);

        }   
     }

    useEffect(()=>{
        getContactsData();
    },[]);
  return (
    <>
     <section className='admin-users-section'>
        <div className="container">
            <h1>Admin User Data</h1>
        </div>
        <div className="container admin-users">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {contactData.map((curContact,index)=>{
        return (<tr key={index}>
            <td>{curContact.username}</td>
            <td>{curContact.email}</td>
            
            <td>
                <button onClick={()=>deleteContactById(curContact._id)}>
                  Delete
                </button>
                </td>
           
    </tr>
        );
    })};
                </tbody>
            </table>
        </div>
    </section>
    </>
    
  )
}

export default AdminContacts



