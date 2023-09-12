import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "./Register/register.scss";

export default function ResetPassword() {
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/password/reset/${id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Password has been reset");
                    navigate("/login");
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='registerContainer'>
            <div className="formContainer">
                <h2 style={{ fontSize: '28px', margin: '20px 0' }}>Reset Password</h2>
                <form onSubmit={handleSubmit} >
                    <div className="labelAndInput">
                        <label htmlFor="password">New Password</label>
                        <input type="password"
                            placeholder='Enter New Password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required autoComplete='off' />
                    </div>
                    <button type='submit'>Reset</button>
                </form>
            </div>
        </div>
    )
}
