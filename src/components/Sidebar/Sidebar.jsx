/* eslint-disable react/prop-types */
import { useState } from 'react'
import './Sidebar.css'
import DiamondIcon from '@mui/icons-material/Diamond';
import LaptopIcon from '@mui/icons-material/Laptop';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { Link } from 'react-router-dom';
const Sidebar = ({ OneToTen, TenToHundreed, HundreedToTausend, GreaterThanTausend, RemoveFilter, filteredProducts, cart }) => {

    const [categories] = useState([
        { name: "electronics", icon: <LaptopIcon /> },
        { name: "jewelery", icon: <DiamondIcon /> },
        { name: "men's clothing", icon: <ManIcon /> },
        { name: "women's clothing", icon: <WomanIcon /> }
    ]);




    return (
        <>
            <div className='mt-14 bg-white h-fit py-10 px-7 absolute ml-4 border-2 border-black rounded-md sidebar z-50'>


                <h3 className='text-3xl font-extralight mb-10'><span className='font-bold font-serif'>MR</span>.BLUE SHOP</h3>
                <p className='mt-4 text-3xl border-b-2 w-fit pb-2 border-black'>Categories</p>
                {categories.map((item) => {
                    return (
                        <ul key={item.name} className='mt-4'>
                            <li className='flex flex-col mb-3 transition-all hover:text-white w-fit p-2 text-lg hover:bg-[#0f0f0f] rounded-sm'><Link state={{ name: item.name, cart: cart }} to={`/products/categories/${item.name}`}>{item.name} {item.icon}</Link></li>
                        </ul>
                    )
                })}
                <p className='mt-4 text-3xl border-b-2 w-fit pb-2 border-black'>By price</p>
                <div className='flex flex-col justify-start align-baseline items-start p-2 mt-2'>
                    <button className='mb-3 text-lg  focus:border-b-2 border-black' onClick={OneToTen}>$1-10</button>
                    <button className='mb-3 text-lg  focus:border-b-2 border-black' onClick={TenToHundreed}>$10-100</button>
                    <button className='mb-3 text-lg  focus:border-b-2 border-black' onClick={HundreedToTausend}>$100-1000</button>
                    <button className='mb-3 text-lg  focus:border-b-2 border-black' onClick={GreaterThanTausend}>More than $1000</button>
                    {filteredProducts !== null ? <button className='mb-3 text-lg bg-black p-2 text-white mt-2 hover:text-red-500 active:scale-90 transition-all border-black' onClick={RemoveFilter}>Remove filter</button> : null}
                </div>
            </div>
        </>
    )
}

export default Sidebar