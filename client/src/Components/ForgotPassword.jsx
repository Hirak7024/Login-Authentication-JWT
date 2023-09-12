import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Register/register.scss";

export default function ForgotPassword() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/password/forgot", { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Reset Password Link has been sent to your gmail")
                    navigate("/login");
                }
            }).catch(err => console.log(err))
    }
    return (
        <div className='registerContainer'>
            <div className="formContainer">
                <h2 style={{ fontSize: '28px', margin: '20px 0' }}>Forgot Password</h2>
                <form onSubmit={handleSubmit} >
                    <div className="labelAndInput">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            placeholder='Enter Your Email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required autoComplete='off' />
                    </div>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}
