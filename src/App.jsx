
import './App.css'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product/Product';
import Categories from './pages/Categories/Categories'
import Search from './pages/Search/Search';
import Cart from './pages/Cart/Cart';
import Account from './pages/Account/Account';
import { CartProvider } from './context/CartContext';
import Login from './pages/AccountLogin/Login';
import { AuthProvider } from './context/AuthContext';


function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/login' Component={Login} />
              <Route path='/signup' Component={Account} />
              <Route path='/shopping-cart' Component={Cart} />
              <Route path='/products/search/:input' Component={Search} />
              <Route path='/products/categories/:category' Component={Categories} />
              <Route path='/products/:id' Component={Product} />
              <Route path='/' Component={Home} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
