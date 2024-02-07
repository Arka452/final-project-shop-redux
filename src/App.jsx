
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product/Product';
import Categroies from './pages/Categories/Categories';


function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path='/products/categories/:category' Component={Categroies}/>
          <Route path='/products/:id' Component={Product} />
          <Route path='/' Component={Home} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
