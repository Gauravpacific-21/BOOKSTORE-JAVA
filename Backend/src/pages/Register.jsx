import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' })
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = () => {
    axios.post('http://localhost:8080/api/users', form)
      .then(() => {
        setSuccess('Account created! Redirecting...')
        setTimeout(() => navigate('/login'), 1500)
      })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={handleRegister}
        style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
        Register
      </button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default Register