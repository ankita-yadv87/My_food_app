import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import CardsData from "./CardsData"
import "./style.css";
import { Link,useNavigate } from 'react-router-dom';
import {add} from "./redux/action/action"

const Cards = (props) => {

    const {showAlert} = props; 

    const [data, setdata] = useState(CardsData);
    //console.log(data);

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const sendData=(ele)=>{
        //console.log(e)
        dispatch(add(ele));
    }

    

    return (
        <>


            <div className='container mt-3'>
                <h2 className='text-center fw-bold'>Order Now! Delicious Food</h2>

                <div className="row d-flex justify-content-center align-items-center">

                    {data.map((element, index) => {

                        return (
                            <>

                                <div className="card mx-1 mt-4" style={{ width: "22rem", border: "none" }} >
                                    <img src={element.imgdata} className="card-img-top mt-3" alt="" style={{ height: "16rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{element.rname}</h5>
                                        <p className="card-text">₹{element.price}</p>
                                        <div className="button_div d-flex justify-content-center">
                                            <button className="btn btn-primary" onClick={()=>sendData(element)}
                                            >Add to Cart</button>
                                            {/* //onClick={() => send(element)} */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })
                    };
                </div>


            </div>
        </>
    )
}

export default Cards