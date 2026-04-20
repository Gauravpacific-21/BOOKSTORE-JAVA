import { Link } from 'react-router-dom'

function Navbar({ cartCount, user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <nav style={{ background: '#333', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>Books</Link>
      <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
        Cart {cartCount > 0 && <span style={{ background: 'red', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.8rem' }}>{cartCount}</span>}
      </Link>
      {user ? (
        <>
          <span style={{ color: 'white', marginLeft: 'auto' }}>Hi, {user.name}</span>
          <button onClick={handleLogout}
            style={{ background: 'red', color: 'white', border: 'none', padding: '0.3rem 0.8rem', cursor: 'pointer' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>Login</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar