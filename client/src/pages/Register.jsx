import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
      });

      const navigate=useNavigate();
      const {storeTokenInLS}=useAuth();
    
      const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      // handle form on submit
      const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(user);
        try{
        const response= await fetch(`http://localhost:5000/register`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),


        });
        const res_data=await response.json();
        console.log("res from server",res_data.extrDetails);
        if(response.ok){
         
          //storing the token in localhost
          storeTokenInLS(res_data.token);
          // localStorage.setItem("token",res_data)
          setUser({username: "",
            email:"",
            phone: "",
            password: "",}
          );
          toast.success("Registration Successful");
          navigate("/");
        }
        else{
          toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message);
          setUser({username: "",
            email:"",
            phone: "",
            password: "",}
          );
        }
      }catch(error){
        console.log("register",error);
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
                src="/images/register.png"
                alt="a nurse with a cute look"
                width="400"
                height="500"
              />
            </div>
            {/* our main registration code  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">registration form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="username"
                  />
                </div>
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
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
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
                  Register Now
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

export default Register