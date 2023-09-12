import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../Register/register.scss";

export default function Login() {
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
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:8000/user/login",formData,{ withCredentials: true }
            );
            console.log(data);
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
            email: "",
            password: "",
        });
    };

    return (
        <div className='registerContainer'>
            <div className="formContainer">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
                    <Link to={'/forgot-password'} className='forgotPasswordLink'>Forgot Password ?</Link>
                    <button type='submit'>Login</button>
                </form>
                <div className="link">
                    <p>Don't Have An Account ? </p>
                    <Link className='signInLink' to={"/register"}>Register</Link>
                </div>
                <ToastContainer/>
            </div>
        </div>
    )
}
