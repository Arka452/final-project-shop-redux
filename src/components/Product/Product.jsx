/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import StarRateIcon from '@mui/icons-material/StarRate';
import './Product.css'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Product = () => {

  const [product, setProduct] = useState({});
  const location = useLocation();
  const productId = location.state.id;
  const [liked, setLiked] = useState(false)
  

  console.log(location.state.id)
  const URL = `https://fakestoreapi.com/products/${productId}`;


  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await axios.get(URL);
        setProduct(response.data);
        console.log("API Response for product ID", productId, ":", response.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct()

  }, [URL])

  const likeHandler = () => {
    const like = liked;
    setLiked(!like)
  }


  return (
    <>
      <Link to='/'><button className='btn-product text-lg font-bold'><ArrowBackIcon className='-mt-1 mr-1' />Back </button></Link>

      <div className="block mt-32 border-2 border-black p-20 w-[60%] m-auto backdrop-blur-sm py-28 singleProduct">
        <div className="flex justify-center gap-14 ">
          <div>
            <img className="w-80 h-80 shadow-xl p-2" src={product.image} alt={product.title} />
          </div>
          <div>
            <h3 className="mb-5 text-3xl w-[20em] text-center font-extralight first-letter:text-5xl first-letter:font-bold">
              {product.title}
            </h3>
            <p className="w-96 text-lg text-justify m-auto mb-8">
              <span className="font-bold text-2xl leading-10">Description:</span> {product.description}
            </p>
          </div>
        </div>
        <div className="flex mt-10 justify-between items-center">
          <div>
            <h3 className="text-6xl font-thin text-[#ff5252]"><span className="text-black">Price:</span> ${product.price}</h3>
            <div className="flex items-center">
              <p className="text-2xl  font-thin mr-2">
                Rating: {product && product.rating ? product.rating.rate : null}
              </p>
              <StarRateIcon />
            </div>
          </div>
          {liked === true ? <button onClick={likeHandler} className="like-button"><span className="text-xl">Liked</span><FavoriteIcon className={liked ? 'text-red-500 transition-all heart-liked' : 'stroke-red-500 text-white transition-all heart'} /></button> :
            <button onClick={likeHandler}><FavoriteIcon className={liked ? 'text-red-500 transition-all heart-liked' : 'stroke-red-500 text-white transition-all heart'} /></button>}
        </div>
      </div>


    </>
  )
}

export default Product