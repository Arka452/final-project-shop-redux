import { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './Cart.css'
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShoppingCart } from '@mui/icons-material';
import { Fade, Typography } from '@mui/material';

const Cart = () => {

    const location = useLocation();
    const [cart, setCart] = useState(location.state.cart); //ma mitunim ba yek hooke useState va useLocation yek state e kamel ra be in surat pass bedim. ba hamin kar ham mitavanim dar page e product in kar ra ruye state e cart emal konim va dakhele cart ezafe konim!!!
    const [quantity, setQuantity] = useState(cart.quantity);
    const navigate = useNavigate();


    const totalPrice = cart.reduce((accumulator, current) => {
        return accumulator + (current.productToAdd.price * current.quantity)
    }, 0);

    const deleteItemFromCart = (id) => {
        const filtered = cart.filter((item) => {
            return item.productToAdd.id !== id
        })
        setCart(filtered)
    }

    const checkOutHandler = () =>{
        setCart([])
        localStorage.clear();
        setTimeout(() => {
            navigate('/')
        }, 500);
    }


    console.log("total price of cart:", totalPrice)
    console.log("Shopping cart page:", cart)



    return (
        <>
            <Link to='/'><button className='btn text-lg font-bold'><ArrowBackIcon className='-mt-1 mr-1' />Back </button></Link>

            {cart.length === 0 ? <>
                <Fade in={true}>
                    <div className="container">
                        <ShoppingCart className="icon" />
                        <Typography variant="h5">Your cart is empty!</Typography>
                    </div>
                </Fade>
            </> :
                <>
                    <div className='backdrop-blur-lg w-fit pb-2  m-auto font-extralight text-6xl'>
                        <h2 className='text-center mt-20 drop-shadow-md shadow-black'><ShoppingBagIcon className='uiIcon' /> My Cart</h2>
                    </div>
                    <div className='mt-20 m-auto'>
                        <ul className='flex justify-around text-xl font-semibold'>
                            <li>Item</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li>Total</li>
                        </ul>
                    </div>
                    <div></div>
                    {cart.map((item) => {
                        return <div className='mt-20 flex m-auto items-center w-[90%] space-x-14 backdrop-blur-lg rounded-md font-bold' key={item.id}>
                            <div className='flex space-x-2 space-y-3 w-[30%]'>
                                <img className='w-52 h-52' src={item.productToAdd.image} alt={item.productToAdd.title} />
                                <div className='flex flex-col w-80'>
                                    <h3 className='text-xl text-balance'>{item.productToAdd.title}</h3>
                                    <p>{item.productToAdd.rating?.count > 1 ? <span className="text-green-500">In Stock</span> : <span className="text-red-500">Out Of Stock</span>}</p>
                                </div>
                            </div>
                            <div className='w-[25%] text-lg'>${item.productToAdd.price}</div>
                            <div className='w-[25%]  items-center'><button className='mr-4 text-xl bg-[#282828] text-white w-7 h-10 rounded-sm' onClick={() => setQuantity(item.quantity += 1)}>+</button>{item.quantity}{item.quantity === 1 ? <button className='ml-4 text-[20px] bg-[#282828] text-white w-7 h-10 rounded-sm ' onClick={() => deleteItemFromCart(item.productToAdd.id)}><DeleteIcon className='delete-icon mr-4 bg-[#282828] text-white ml-[1.5px]  rounded-sm ' /></button> : <button className='ml-4 text-xl bg-[#282828] text-white w-7 h-10 rounded-sm' onClick={() => setQuantity(item.quantity -= 1)}>-</button>}</div>
                            <div className='text-xl'>${(item.productToAdd.price * item.quantity).toFixed(2)}</div>
                        </div>
                    })}
                </>
            }
            {cart.length > 0 && <div className='flex mt-14'>
                <button className="comic-button mr-2" onClick={checkOutHandler}>Check Out</button>
                <div className='flex w-[20%] border-2 backdrop-blur-md border-black py-4 text-center font-thin mr-3'><span className='text-4xl m-auto'>Grand Total:</span><h2 className='text-4xl text-center m-auto -ml-2'>${totalPrice.toFixed(2)}</h2></div>
            </div>}


        </>
    )
}

export default Cart