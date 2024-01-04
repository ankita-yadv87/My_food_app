import React, { useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { del } from "./redux/action/action"
import shoppy from "./shoppy.gif";



const Payments = (props) => {

  const navigate = useNavigate();

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

// useEffect(()=>{
// if(!localStorage.getItem('token')){
//   Navigate('/login');
// }
// },[])



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
    <div className='container fluid mx-auto'>
      {
        getdata.length ?
          <div className="card mx-1 mt-4" style={{ width: "40rem", border: "outset" , padding: 10}}>

            {/* <Cart getdata={getdata}/> */}
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>

                {
                  getdata.map((element) => {
                    return (
                      <>
                        <tr>
                          <td>
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
                  <StripeCheckout
                    name='payment gateway'
                    currency='inr'
                    amount={price*100}
                    token={onToken}
                    stripeKey="pk_test_51LjgX0SJ7ZSvcZxXVMbGQI3Q0nQw6LTt1ck7uMSHhoyKF0cZ6EbWQZpHtfGADeaUUQtjE0qkpZpFT0IzFsxDOfY000X0o615gH"
                  />
                </div>

              </tbody>
            </table>

          </div>
          :
          <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
            <i className='fas fa-close smallclose'
              style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} onClick={handleClose}></i>
            <p style={{ fontSize: 22 }}>Your cart is empty</p>
            <img src={shoppy} alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
          </div>
      }
      </div>
    </>
  )
}

export default Payments

