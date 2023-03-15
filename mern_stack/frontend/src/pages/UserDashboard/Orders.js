import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails } from '../../api/UserApi';
import NavbarUser from '../../components/NavbarUser'
import OrderDetail from '../../components/OrderDetail';
import { setDetails } from '../../store/userOrder';

const Orders = () => {
    const details = useSelector((state)=>state.cartDetail)
    console.log(details);
    const dispatch = useDispatch();

    const cartDetails = async()=>{
        await getCartDetails().then((res)=>{
         dispatch(setDetails(res.getaUser.cart));
        }).catch((err)=>{
          console.log(err);
        })
      }

      useEffect(()=>{
        
        cartDetails()
      },[])
  return (
    <div>
        <NavbarUser/>
        <h1 style={{textAlign:"center"}}>Orders</h1>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
            {details.map((el,index)=>{
              return  <OrderDetail key={index} detail={el}/>
            })}
        </div>
    </div>
  )
}

export default Orders