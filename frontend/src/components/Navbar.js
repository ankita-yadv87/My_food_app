import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import MyCart from './MyCart';




const Navbar = (props) => {

    const getdata = useSelector((state) => state.cartReducer.carts);
    let navigate = useNavigate();
    //console.log(getdata);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  " style={{ height: "70px" }}>
            <div className="container">
                <Link className="navbar-brand" to="/">ShopApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>

                    {localStorage.getItem('token') ?
                        <button className="btn btn-primary mx-1" onClick={handleLogout}>log out</button>
                        : <form>
                            <Link className='btn btn-primary mx-2' to="/login">login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup">SignUp</Link>
                        </form>
                    }


                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    ><i className="fa-solid fa-cart-shopping text-light p-2" style={{ fontSize: 25, cursor: "pointer" }} ></i>
                    </Badge>

                </div>
            </div>


            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                {
                    <MyCart showAlert={props.showAlert} />
                }
            </Menu>
        </nav>

    )
}

export default Navbar