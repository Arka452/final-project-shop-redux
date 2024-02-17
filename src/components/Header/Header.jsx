/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useState } from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Header = ({ products, cart }) => {

    const [input, setInput] = useState('');



    return (
        <div className='flex justify-around items-center mt-6 p-5 h-[70px] bg-white rounded-full mx-auto w-[80%] border-[1px] border-black navbar'>
            <Link className='text-3xl font-extralight' to='/'><span className='font-bold font-serif'>MR</span>.BLUE</Link>

            <div className="flex items-center border-2 rounded-lg border-black">
                <input type="text" className="bg-white border-gray-300 rounded-lg p-2 outline-none transition-all" placeholder='Search...' value={input} onChange={(event) => setInput(event.target.value)} />
                {input.trim() !== '' && (
                    <Link to={`/products/search/${input}`} state={{ products: products }}>
                        <button className="bg-[#ffffff] text-black p-2 hover:bg-[#000000] rounded-r-md hover:text-white transition-all">
                            <SearchIcon />
                        </button>
                    </Link>
                )}
            </div>

            <div>
                <ul className='flex gap-6 font-semibold '>
                    <li className='hover:scale-110 transition-all duration-150 scale-105 border-[#515151] relative'>
                        <Link to="/shopping-cart" state={{ cart: cart }}><ShoppingCartIcon />{cart?.length > 0 ? <span className='bg-white border-[1px] border-black rounded-full w-6 h-6 absolute text-center -ml-3 -mt-3'>{cart.length}</span> : null}</Link>
                    </li>
                    <li className='hover:scale-110 transition-all scale-105 duration-150 border-[#515151]'>
                        <Link to="/account"><PersonIcon /></Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Header