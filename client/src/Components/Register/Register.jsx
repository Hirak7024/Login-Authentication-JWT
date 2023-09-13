import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./register.scss";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://login-authentication-jwt.onrender.com/user/register",formData,{ withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
        name: "",
        email: "",
        password: "",
      });
}

    return (
        <div className='registerContainer'>
            <div className="formContainer">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="labelAndInput">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            placeholder='Enter Your Name'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required autoComplete='off' />
                    </div>
                    <div className="labelAndInput">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            placeholder='Enter Your Email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required autoComplete='off' />
                    </div>
                    <div className="labelAndInput">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            placeholder='Enter Your Password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required autoComplete='off' />
                    </div>
                    <button type='submit'>Register</button>
                </form>
                <div className="link">
                    <p>Already Have An Account ? </p>
                    <Link className='signInLink' to={"/login"}>Login</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}