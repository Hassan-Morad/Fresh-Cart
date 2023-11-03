import axios from "axios";
import { createContext } from "react";

export let UserContext = createContext();

function getUserOrder(id){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
   .then((res)=>res)
   .catch((res)=>res);
}

export default function UserOrderContextProvider(props){
    return <UserContext.Provider  value={{getUserOrder}}>
        {props.children}
    </UserContext.Provider>
}