import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { del, add, removeQty} from './redux/action/action';



const CardsDetails = (props) => {

    const {showAlert} = props; 

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setdata] = useState([]);
    //console.log(data);

    const { id } = useParams();
    //console.log(id);

    const getdata = useSelector((state) => state.cartReducer.carts);
    //console.log(getdata);

    const compare = () => {
        let comparedata = getdata.filter((x) => {
            return x.id == id;
        })

        setdata(comparedata);
    };

    useEffect(() => {
        compare();
    }, [id]);

    const handleRemove = (id) => {
        dispatch(del(id));
        navigate("/")
    };

    const addToCart =(item)=>{
        dispatch(add(item));
    };

    const delQty = (itm) => {
        dispatch(removeQty(itm));
        // navigate("/")
    };



    return (
        <div className="container mt-2 ">
            <h2 className='text-center'>Items Detail
            </h2>

            {data.map((item) => {
                return (
                    <>
                        <div className='container d-flex justify-content-center  my-5'>


                            <div className="row justify-content-center">
                                <div className="items_img mx-2">
                                    <img src={item.imgdata} alt="" style={{ height: "16rem" }} />
                                </div>
                            </div>


                            <div className="container mx-4">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p> <strong>Restaurant</strong>  : {item.rname}</p>
                                                <p> <strong>Price</strong>  : ₹ {item.price}</p>
                                                <p> <strong>Dishes</strong>  : {item.address}</p>
                                                <p> <strong>Total</strong>  :₹ {item.price * item.qnty}</p>

                                                <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                    <span style={{ fontSize: 24 }} onClick={item.qnty <=1 ? ()=>handleRemove(item.id) : ()=>delQty(item)} >-</span>
                                                    <span style={{ fontSize: 22 }}>{item.qnty}</span>
                                                    <span style={{ fontSize: 24 }} onClick={()=>addToCart(item)} >+</span>

                                                </div>



                                            </td>

                                            <td >
                                                <p className="mx-5"><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px px", borderRadius: "5px" }}>{item.rating} ★	</span></p>
                                                <p className="mx-5"><strong>Order Review :</strong> <span >{item.somedata}	</span></p>
                                                <p className="mx-5"><strong>Remove :</strong> <span ><i className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => handleRemove(item.id)} ></i>	</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div >
                    </>
                )
            })}


        </div>

    )
}

export default CardsDetails