import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);


    if (json.success) {
      // Save the auth token and redirect
      
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account Created Successfully", "success");
      
    }
    else {
      props.showAlert("Sorry a user with this email already exists", "danger");
      setCredentials({ name: "", email: "", password: "" });
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value, })
  }


    return (
        <>
    
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100 my-4" >
              <div className="col-lg-12 col-xl-11">
                <div className='card text-dark'>
                  <div className="card-body p-md-5" >
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit} autoComplete="off">
    
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example1c" className="form-control" name='name' onChange={onChange} value={credentials.name} />
                              <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                            </div>
                          </div>
    
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="form3Example3c" className="form-control"  name='email' onChange={onChange} value={credentials.email} />
                              <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            </div>
                          </div>
    
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4c" className="form-control" name='password' onChange={onChange} value={credentials.password} />
                              <label className="form-label" htmlFor="form3Example4c">Password</label>
                            </div>
                          </div>
    
                         
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" >Register</button>
                          </div>
    
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

export default Signup;