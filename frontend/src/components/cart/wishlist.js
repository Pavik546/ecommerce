import { Fragment } from 'react'
import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty,removeItemFromCart } from '../../slices/cartSlice';
import axios from 'axios';

export default function Wishlist() {
   /* const {items } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    const checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }
*/
const [items, setItems] = useState([]);

useEffect(async() => {
    
    try {
            
        const response=await axios.get(`http://localhost:8000/api/v1/wishlist`);
        if(response.status===200){
        setItems(response.data.product)
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
  
  }, []);
  



    return (
        <Fragment>
        {items.length==0 ? 
            <h2 className="mt-5">Your Wishlist is Empty</h2> :
            <Fragment>
                 <h2 className="mt-5">Your Wishlist: <b>{items.length} items</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {items.map(item => (
                            <Fragment key={item.product}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.images[0].image} alt={item.name} height="90" width="115"/>
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${item.price}</p>
                                        </div>

                                        

                                    </div>
                                </div>
                            </Fragment>
                            )
                        )
                        }

                     
                        <hr />
                    </div>

                   
                </div>
            </Fragment>
        }
       
    </Fragment>
)
}