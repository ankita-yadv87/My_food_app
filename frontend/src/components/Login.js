import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Successfully Logged in", "success");

        }
        else {
            props.showAlert("Invalid credentials", "danger");
           
        }
    }

    useEffect(()=>{
        props.showAlert("Please login before proceeding to payment", "danger");
    },[]);

   return (
        <>
        
            <div className="container h-50 " >
                <div className="row d-flex justify-content-center align-items-center h-50 my-5"  >
                    <div className="col-lg-12 col-xl-11" >
                        <div className='card text-dark'>
                            <div className="card-body p-md-5  " style={{border: "1px solid"}}  >
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 " >

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3" >
                                                <label htmlFor="email" className="form-label">Email address</label>
                                                <input type="email" className="form-control"  value={credentials.email} autoComplete="username" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control"  value={credentials.password} autoComplete="current-password" onChange={onChange} name="password" id="password" />
                                            </div>

                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login