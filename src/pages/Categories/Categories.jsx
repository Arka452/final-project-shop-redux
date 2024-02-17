import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Header from '../../components/Header/Header'

const Categroies = () => {

  const [products, setProducts] = useState([]);
  const location = useLocation();
  const category = location.state.name;
  const [cart,setCart] = useState([])
  const URL = `https://fakestoreapi.com/products/category/${category}`;

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get(URL);
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()


  }, [URL])

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

  console.log(category)

  return (
    <>
    <Header cart={cart}/>
    <div className='flex'>
      <Sidebar />

      <div className='grid grid-cols-3 gap-6 mt-14 w-[70%] m-auto'>

        {products.map((item) => {
          return (
            <>
              <div key={item.category} className='productCard w-64 h-96 flex flex-col justify-between items-center text-center m-auto border-2 border-black rounded-md p-6 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:border-black hover:bg-gray-100 backdrop-blur-sm'
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
                    onClick={() => addToCart(item.id)}
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
    </>
    
  )
}

export default Categroies