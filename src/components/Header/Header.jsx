import { Link } from 'react-router-dom'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
const Header = () => {
    return (
        <div className='flex justify-around items-center mt-6 p-5 h-[70px] bg-white rounded-full mx-auto w-[80%] border-[1px] border-black navbar'>
            <Link className='text-3xl font-extralight' to='/'><span className='font-bold font-serif'>MR</span>.BLUE</Link>

            <div className="flex items-center border-2 rounded-lg border-black">
                <input type="text" className="bg-white border-gray-300 rounded-lg p-2 outline-none transition-all" placeholder='Search...' />
                <button className="bg-[#ffffff] text-black p-2 hover:bg-[#000000] rounded-r-md  hover:text-white transition-all"><SearchIcon /></button>
            </div>

            <div>
                <ul className='flex gap-6 font-semibold '>
                    <li className='hover:scale-125 transition-all duration-150 scale-110 border-[#515151]'>
                        <Link to="/basket"><ShoppingCartIcon/></Link>
                    </li>
                    <li className='hover:scale-125 transition-all scale-110 duration-150 border-[#515151]'>
                        <Link to="/account"><PersonIcon/></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header