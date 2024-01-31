
import './Header.css'
const Header = () => {
    return (
        <div className='flex justify-around items-center mt-6 p-5 h-[70px] bg-[#a5b6b64b] backdrop-blur-lg rounded-full m-auto w-[50%]'>
            <div><h2 className='text-3xl -mt-1 font-extralight'>MR.BLUE</h2></div>
            <div><input type="text" className='bg-[#FEFCF8] rounded-l-md p-1 outline-none inline-block'></input><button className='bg-[#FEFCF8] p-1 rounded-r-md border-[#cfcfcf] border-l font-light hover:font-medium transition-all'>Search</button></div>     
            <div>
                <ul className='flex gap-6 font-semibold '>
                    <li className='hover:border-b-2 border-[#515151]'>
                        <a href="/">Basket</a>
                    </li>
                    <li className='hover:border-b-2 border-[#515151]'>
                        <a href="/">Account</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header