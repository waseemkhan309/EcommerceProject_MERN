import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();
// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) { setCart(JSON.parse(existingCartItem)) }
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};
// custom hook
const useCart = () => useContext(CartContext);
// eslint-disable-next-line 
export { useCart, CartProvider }

