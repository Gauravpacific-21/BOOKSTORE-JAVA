import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart, setCart }) {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const gst = Math.round(subtotal * 0.18 * 100) / 100
  const total = Math.round((subtotal + gst) * 100) / 100

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('Please login first!')
      navigate('/login')
      return
    }

    const order = {
      user: { id: user.id },
      status: 'COMPLETED',
      total: total,
      gst: gst,
      orderItems: cart.map(item => ({
        book: { id: item.id },
        quantity: item.quantity,
        price: item.price
      }))
    }

    axios.post('http://localhost:8080/api/orders', order)
      .then(() => {
        setSuccess('Sale completed successfully!')
        setCart([])
        setTimeout(() => navigate('/'), 2000)
      })
      .catch(err => {
        console.error('Error:', err.response?.data)
        setError('Something went wrong. Try again.')
      })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Invoice</h2>
      <div style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '4px' }}>
        <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Bookstore POS</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.title} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ccc', marginTop: '1rem', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>GST (18%)</span>
                <span>${gst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            <button onClick={handlePlaceOrder}
              style={{ width: '100%', background: 'green', color: 'white', border: 'none', padding: '0.8rem', cursor: 'pointer', marginTop: '1rem', fontSize: '1rem' }}>
              Confirm Sale
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Checkout