import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "../style/cart.css";

function Cart() {
  const [cartItem, setcartItem] = useState([]);
  const history = useHistory()
  const [{basket}, dispatch ] = useStateValue();
  // console.log('this is basket >>>' , basket)
  useEffect(() => {
    let cartItem = JSON.parse(window.localStorage.getItem("cartItem"));
    // console.log(cartItem);
    setcartItem(cartItem);
  }, []);

  let totleNum =0 
  let gt = 0


  const Checkout=()=>{
      const user = JSON.parse(window.localStorage.getItem('user'))
      if(user)
        history.push('/payment')
      else{
        window.localStorage.setItem('paymentAfterLogin','yes')
        history.push('/login')
      }
  }

  return (
    <>
      <NavLink to="/">
        <div className="mt-3 btn btn-danger">
          <p>Back</p>
        </div>
      </NavLink>

      <div className="row px-5" >
        <div className="col-lg-8 col-md-8 col-7">
          <div id="cartItemDiv" className=" d-flex  flex-column flex-wrap ">
            <div style={{ width: " max-content" }}>
              <div>
                <h1> Shoping Cart </h1>
              </div>
              <div id="cartItems">
                {basket?.map((item, i) =>
                  item ? (
                    <Item
                      key={i}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      qty={item.qty}
                      id={item.id}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="details_cart col-lg-4 col-md-4 col-5"
          id="details_cart"
        >
           <div className=" container-fluid p-4 mt-5 ml-auto" style={{border: '1px solid black', borderRadius : '2rem',width:'20vw'}} >
             {basket?.map(item =>{
                      if(item){
                       totleNum += parseInt( item.qty)
                       gt += parseInt((item.qty * item.price))
               }
               return null
              })
             }
              {totleNum ? (<>
                <h2>Subtotal ( {totleNum} items ) : $ {Math.floor(gt)+1}</h2>
                <div onClick={Checkout} className="mt-4 btn btn-success w-100" style={{cursor:'pointer'}}>
                  <p>Proceed To Checkout</p>
                </div></>
              ):(<h1 className='text-center'>Nothing in your Cart </h1>)}
           </div>
        </div>
      </div>
    </>
  );
}



const Item = ({ name, image, price, qty, id }) => {
  const [Qty, setQty] = useState(qty);
  const [cartItem, setcartItem] = useState([]);
  const [{basket}, dispatch] = useStateValue();
  useEffect(() => {
    let cartItem = JSON.parse(window.localStorage.getItem("cartItem"));
    setcartItem(cartItem);
  }, []);


   // setying updated cart items in basket 
   const setCart = () =>{
    let cartItem = window.localStorage.getItem("cartItem")
    ? JSON.parse(window.localStorage.getItem("cartItem"))
    : [];
    // empty the basket
    dispatch({
      type : 'EMPTY_THE_BASKET',
      item : 1,
    })
   cartItem.map(items =>{
    //seting the old basket
    dispatch({
      type:'SET_OLD_BASKET',
      item: items,
    })
    return null
   })
  }

  const changeqty = (id, th) => {
    let cart = cartItem?.map((item) => {
      if (item.id === id) {
        item.qty = th.value;
      }
      return item;
    });
    console.log(cart);
    window.localStorage.removeItem("cartItem");
    window.localStorage.setItem("cartItem", JSON.stringify(cart));
    let cartNow = JSON.parse(window.localStorage.getItem("cartItem"));
    setcartItem(cartNow);
    // history.push('/')
    setCart()
    // window.location = "/cart";

  };

  
  const removeit = (id) => {
    let cart = cartItem?.map((item) => {
      if (item.id === id) {
        return 0;
      }
      return item;
    });
    // console.log(cart);
    window.localStorage.removeItem("cartItem");
    window.localStorage.setItem("cartItem", JSON.stringify(cart));
    setCart()

  };
  return (
    <>
      <div className="CartItem row p-4">
        <div className="col-md-3 col-3" style={{ backgroundSize: "100% 100%" }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${image}`}
            id="proImage"
            alt={name}
          />
        </div>
        <div className=" col-lg-9 col-md-9 col-9 pl-5">
          <div className="row">
            <h3> ${name} </h3> <h3 className=" ml-auto"> $ {Qty * price} </h3>
          </div>
          <h4 className="row">
            QTY :
            <input
              type="number"
              name="qty"
              min="1"
              value={Qty}
              style={{marginBottom:'1rem'}}
              onChange={(e) => {
                if (e.target.value < 0) {
                  alert("item no can not be less than zero");
                  return;
                } else if (e.target.value === null) setQty(null);
                setQty(e.target.value);
                changeqty(id, e.target);
              }}
            />
            <button
              onClick={()=>{
                removeit(id)
              }}
              className="btn btn-danger ml-5"
              id="removeCartButton"
              
            >
              <p>Remove</p>
            </button>
          </h4>
        </div>
      </div>
    </>
  );
};
export default Cart;
