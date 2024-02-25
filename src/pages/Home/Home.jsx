import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header';
import { CartContext } from '../../context/CartContext';




const Home = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cart, setCart } = useContext(CartContext);




    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {

        const URL = 'https://fakestoreapi.com/products'
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get(URL);
                setProducts(response.data);
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
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

    const addToCart = (id) => {
        let quantity = 1;

        // Find the product to add to cart
        const productToAdd = products.find((product) => product.id === id);

        // Find the index of the product in the cart
        const indexInCart = cart.findIndex((item) => item.productToAdd.id === id);

        if (indexInCart !== -1) {
            // If the product already exists in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[indexInCart].quantity += 1;
            setCart(updatedCart);
        } else {
            // If the product is not in the cart, add it
            setCart([...cart, { quantity: quantity, productToAdd }]);
        }
    };



    console.log("filtered products state", filteredProducts)
    console.log("Cart:", cart)

    return (
        <>
            <Header products={products} cart={cart} />
            <div className='flex'>
                {loading ? null : <Sidebar OneToTen={filterProductsByPrice} TenToHundreed={filterProductsByPriceTwo} HundreedToTausend={filterProductsByPriceThree} GreaterThanTausend={filterProductsByPriceFour} RemoveFilter={removeFilter} filteredProducts={filteredProducts} cart={cart} setCart={setCart} />}

                {loading ? (
                    <ul className="wave-menu">
                        {[...Array(10)].map((_, index) => <li key={index}></li>)}
                    </ul>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 w-[70%] m-auto'>
                        {filteredProducts === null ? products.map((item) => (
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
                                            className='text-black active:scale-90 bg-[#fff] border-spacing-1 border-black rounded-md p-2 border-2 focus:outline-none hover:scale-105 transition-all hover:text-[#ff5252]'
                                        >
                                            More...
                                        </button>
                                    </Link>
                                    <button
                                        type='button'
                                        className='bg-black text-white px-5 py-1 rounded-md hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none'
                                        onClick={() => addToCart(item.id)}
                                    >
                                        <ShoppingCartIcon />
                                    </button>
                                </div>
                            </div>
                        )) : filteredProducts.map((item) => (
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
                                            className='text-black active:scale-90 bg-[#fff] border-spacing-1 border-black rounded-md p-2 border-2 focus:outline-none hover:scale-105 transition-all hover:text-[#ff5252]'
                                        >
                                            More...
                                        </button>
                                    </Link>
                                    <button
                                        type='button'
                                        className='bg-black text-white px-5 py-1 rounded-md hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none'
                                        onClick={() => addToCart(item.id)}
                                    >
                                        <ShoppingCartIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )

}

export default Home



