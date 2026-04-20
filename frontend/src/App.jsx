import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App