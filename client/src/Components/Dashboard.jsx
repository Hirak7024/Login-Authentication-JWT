import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div style={{display:'flex', justifyContent:'center', marginTop:'5rem'}}>
            <Link to={"/login"}>
                <button style={{width:'80px', height: '40px', border :'none', backgroundColor:'#2234AE', color:'white', fontSize:'17px', fontWeight:'500', cursor:'pointer'}} >
                    login</button>
            </Link>
        </div>
    )
}
