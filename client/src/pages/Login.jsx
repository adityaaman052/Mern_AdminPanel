import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth"
import {toast} from "react-toastify"

const URL="http://localhost:5000/login"


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {storeTokenInLS}=useAuth();

const navigate=useNavigate()
  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,//dynamic name , can get both email and password
    });
  };
  const handleSubmit= async (e) =>{
    e.preventDefault();
    try{
      const response=await fetch(URL, {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      console.log("login", response);
      const res_data=await response.json();

      if(response.ok){
          //storing the token in localhost
          storeTokenInLS(res_data.token);
          // localStorage.setItem("token",res_data.token)
        toast.success("Login Successful");
        setUser({email:"",password: ""});
        navigate("/");

      }
      else{
        toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message);
        console.log("invalid credentials")
      }

    }
    catch(error){

    }


  };
  return (
    <>
       <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="lets fill the login form"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login