import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { del } from "./redux/action/action"
import shoppy from "./shoppy.gif";

const MyCart = (props) => {

    const onToken = (token) => {
    console.log(token);
    };

    const getdata = useSelector((state) => state.cartReducer.carts);

    const [price, setprice] = useState(0);
    console.log(price);

    const total = () => {
        let prc = 0;
        getdata.map((item) => {
            prc = item.price * item.qnty + prc;
        });
        setprice(prc);
    }

    useEffect(() => {
        total();
    }, [total]);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = (id) => {
        dispatch(del(id));
    };

    

    return (
        <>
            <div className='container mx-2 p-4'>
                {
                    getdata.length ?
                        <div className="card mx-2 mt-4" style={{ width: "30rem", border: "outset", padding:10}}>

                            <table className='mx-2 p-2'>
                                <thead className='my-2 mx-2 p-2'>
                                    <tr >
                                        <th>Photo</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody className='my-2 mx-2 p-2'>

                                    {
                                        getdata.map((element) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className='my-2'>
                                                            <Link to={`/cart/${element.id}`} onClick={handleClose}>
                                                                <img src={element.imgdata} style={{ width: "10rem", height: "10rem" }} alt="" /></Link>

                                                        </td>
                                                        <td>
                                                            <p>{element.rname}</p>
                                                            <p>Price : ₹{element.price}</p>
                                                            <p>Quantity : {element.qnty}</p>
                                                            <p className="mx-5"><span ><i className='fas fa-trash smalltrash' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => handleDelete(element.id)} ></i></span></p>
                                                        </td>
                                                        <td>
                                                            <p className="mx-5"><span ><i className='fas fa-trash largetrash' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => handleDelete(element.id)}></i></span></p>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <div className='container justify-content-center align-items-center mx-auto my-4'>
                                        <p className=' fw-bold'>Total :₹ {price} </p>
                                        <Link className='btn btn-primary' to={localStorage.getItem('token')? `/payments` : `/login` } onClick={handleClose}><h6>Proceed to payment</h6></Link>
                                    </div>

                                </tbody>
                            </table>

                        </div>
                        :
                        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }} >
                            <i className='fas fa-close smallclose' onClick={handleClose}
                                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} ></i>
                            <p style={{ fontSize: 22 }}>Your cart is empty</p>
                            <img src={shoppy} alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                        </div>
                }
            </div>
        </>
    )
}

export default MyCart;