import { useNavigate } from 'react-router-dom'

function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('Please login first!')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}
                style={{ background: 'red', color: 'white', border: 'none', padding: '0.3rem 0.8rem', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleCheckout}
            style={{ background: 'green', color: 'white', border: 'none', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
            Checkout
          </button>
        </>
      )}
    </div>
  )
}

export default Cart