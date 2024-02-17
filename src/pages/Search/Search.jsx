import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import image from '../../assets/flat-design-no-data-illustration.jpg';

const Searchs = () => {

    const location = useLocation();
    const [searchedProducts, setSearchedProducts] = useState([]);
    const input = decodeURIComponent(location.pathname.split('/').pop());  //decode ur baraye mogheyi hast ke mavaghti ba space zadan fasele mindazim un url ghati mishe va in decode miad url e pure i ke ma search kardim ro bar migardune
    const products = location.state.products;



    useEffect(() => {
        // Perform filtering logic based on the input query
        const findSearchedProducts = products.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()));

        setSearchedProducts(findSearchedProducts);

    }, [input]);


    let gridColumns = 'grid-cols-3'; // Default to 3 columns

    if (searchedProducts.length <= 2) {
        gridColumns = 'grid-cols-2'; // Set to 2 columns if there are 2 or fewer products
    }

    if (searchedProducts.length === 1) {
        gridColumns = 'grid-cols-1'; // Set to 1 column if there is only 1 product
    }

    return (
        <>
            <Link to='/'><button className='btn text-lg font-bold'><ArrowBackIcon className='-mt-1 mr-1' />Back </button></Link>

            {searchedProducts.length === 0 ? (
                <>  <div className="flex flex-col items-center mt-8">
                    <img src={image} alt="No products found" className="mb-4 w-80 grayscale hover:grayscale-0 transition-all duration-500" />
                    <Typography variant="h4" className="font-bold backdrop-blur-sm">
                        {`No products found for "${input}"`}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-4 backdrop-blur-sm">
                        Please try searching for something else.
                    </Typography>
                    <Search className="text-gray-500 animate-bounce text-4xl mt-10 search-icon" />
                </div></>
            ) : null}

            <div className={`grid ${gridColumns} gap-6 mt-14 w-[70%] m-auto`}>
                {searchedProducts.map((item) => (
                    <div key={item.id} className='productCard w-64 h-96 flex flex-col justify-between items-center text-center m-auto border-2 border-black rounded-md p-6 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:border-black hover:bg-gray-100 backdrop-blur-sm'>
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
                ))}
            </div>
        </>
    );
}

export default Searchs