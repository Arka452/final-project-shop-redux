/* eslint-disable react/prop-types */
import  { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const storedItems = localStorage.getItem('cart');
        if (storedItems) {
            setCart(JSON.parse(storedItems));
        }

    }, [])

    useEffect(()=>{

        localStorage.setItem('cart', JSON.stringify(cart));

    },[cart])

    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )

}