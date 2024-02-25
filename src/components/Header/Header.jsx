/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const Header = ({ products, cart }) => {

    const [input, setInput] = useState('');
    const { auth, setAuth } = useContext(AuthContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const signOutHandler = () => {
        setAuth(false)
    }


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
                        {auth ? <><button onClick={handleOpen} className=''><LogoutIcon /></button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <h3>Are you sure you want to sign out ?</h3>
                                    </Typography>
                                    <div className='flex justify-center space-x-10 mt-5'>
                                        <button onClick={signOutHandler} className='bg-black text-white w-16 h-10 hover:bg-white hover:border-2 hover:border-black hover:text-black active:scale-90 transition-all'>Yes</button>
                                        <button onClick={handleClose} className='bg-black text-white w-16 h-10 hover:bg-white hover:border-2 hover:border-black hover:text-black active:scale-90 transition-all'>No</button>
                                    </div>
                                </Box>
                            </Modal>
                        </> : <Link to="/signup"><LoginIcon /></Link>}
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Header