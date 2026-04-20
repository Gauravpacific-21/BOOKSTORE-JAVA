import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    axios.get('http://localhost:8080/api/users')
      .then(res => {
        const found = res.data.find(u => u.email === email && u.password === password)
        if (found) {
          localStorage.setItem('user', JSON.stringify(found))
          setUser(found)
          navigate('/')
        } else {
          setError('Invalid email or password')
        }
      })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <input placeholder="Password" type="password" value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}
        style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
        Login
      </button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  )
}

export default Login