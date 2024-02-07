import { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from '../../components/Sidebar/Sidebar'
const Home = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);

    useEffect(() => {
        const URL = 'https://fakestoreapi.com/products'
        const fetchProducts = async () => {
            try {
                const response = await axios.get(URL);
                setProducts(response.data);
                console.log(response.data)
            } catch (error) {
                throw new Error(error)
            }
        }

        fetchProducts()

    }, []);


    const filterProductsByPrice = () => {
        const filteredProducts = products.filter((item) => {
            return item.price > 0 && item.price <= 10;
        });
        setFilteredProducts(filteredProducts);
    }

    const filterProductsByPriceTwo = () => {
        const filteredProducts = products.filter((item) => {
            return item.price >= 10 && item.price <= 100;
        });
        setFilteredProducts(filteredProducts);
    }

    const filterProductsByPriceThree = () => {
        const filteredProducts = products.filter((item) => {
            return item.price >= 100 && item.price <= 1000;
        });
        setFilteredProducts(filteredProducts);
    }

    const filterProductsByPriceFour = () => {
        const filteredProducts = products.filter((item) => {
            return item.price > 1000;
        });
        setFilteredProducts(filteredProducts);
    }

    const removeFilter = () => {
        setFilteredProducts(null)
    }

  

    return (
        <div className='flex'>
            <Sidebar OneToTen={filterProductsByPrice} TenToHundreed={filterProductsByPriceTwo} HundreedToTausend={filterProductsByPriceThree} GreaterThanTausend={filterProductsByPriceFour} RemoveFilter={removeFilter} filteredProducts={filteredProducts} />

            <div className='grid grid-cols-3 gap-6 mt-14 w-[70%] m-auto'>

                {filteredProducts === null ? products.map((item) => {
                    return (
                        <>
                            <div className='productCard w-64 h-96 flex flex-col justify-between items-center text-center m-auto border-2 border-black rounded-md p-6 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:border-black hover:bg-gray-100 backdrop-blur-sm'
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='w-32 h-32 mb-2'

                                />
                                <div className="flex flex-col justify-center items-center">
                                    <p className='text-sm p-2 text-pretty font-semibold'>{item.title}</p>
                                    <hr className='h-1 bg-black w-48 my-2' />
                                    <p className='text-gray-600 text-lg'><span className='text-black font-semibold'>Price:</span> ${item.price}</p>
                                </div>
                                <div className='flex justify-center gap-10 mt-4'>
                                    <Link className='m-auto cursor-pointer' to={`/products/${item.id}`} state={{ id: item.id }}>
                                        <button
                                            type='button'
                                            className='text-black bg-[#fff] border-spacing-1 border-black rounded-md p-2 border-2 font-semibold active:scale-90 transition-all hover:text-[#ff5252]'
                                        >
                                            More...
                                        </button>
                                    </Link>
                                    <button
                                        type='button'
                                        className='bg-black text-white px-5 py-1 rounded-md hover:bg-zinc-800 active:scale-90 transition-all ease-in-out focus:outline-none'
                                    >
                                        <ShoppingCartIcon />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }) : filteredProducts.map((item) => {
                    return (
                        <>
                            <div className='productCard w-64 h-96 flex flex-col justify-between items-center text-center m-auto border-2 border-black rounded-md p-6 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:border-black hover:bg-gray-100 backdrop-blur-sm'
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='w-32 h-32 mb-2'

                                />
                                <div className="flex flex-col justify-center items-center">
                                    <p className='text-sm p-2 text-pretty font-semibold'>{item.title}</p>
                                    <hr className='h-1 bg-black w-48 my-2' />
                                    <p className='text-gray-600 text-lg'><span className='text-black font-semibold'>Price:</span> ${item.price}</p>
                                </div>
                                <div className='flex justify-center gap-10 mt-4'>
                                    <Link className='m-auto cursor-pointer' to={`/products/${item.id}`} state={{ id: item.id }}>
                                        <button
                                            type='button'
                                            className='text-black bg-[#fff] border-spacing-1 border-black rounded-md p-2 border-2 focus:outline-none hover:scale-105 transition-all hover:text-[#ff5252]'
                                        >
                                            More...
                                        </button>
                                    </Link>
                                    <button
                                        type='button'
                                        className='bg-black text-white px-5 py-1 rounded-md hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none'
                                    >
                                        <ShoppingCartIcon />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Home



