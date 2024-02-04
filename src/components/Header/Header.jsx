import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
    return (
        <div className='flex justify-around items-center mt-6 p-5 h-[70px] bg-white rounded-full mx-auto w-[80%] border-[1px] border-black navbar'>
  <Link className='text-3xl font-extralight' to='/'>MR.BLUE</Link>

  <div className="flex items-center border-2 rounded-lg border-black">
    <input type="text" className="bg-white border-gray-300 rounded-lg p-2 outline-none transition-all"/>
    <button className="bg-[#ffffff] text-black p-2 hover:bg-[#000000] rounded-r-md  hover:text-white transition-all">Search</button>
  </div>
     
            <div>
                <ul className='flex gap-6 font-semibold '>
                    <li className='hover:border-b-2 transition-all duration-150 border-[#515151]'>
                        <Link to="/basket">Basket</Link>
                    </li>
                    <li className='hover:border-b-2 transition-all duration-150 border-[#515151]'>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header