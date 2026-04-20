import { useEffect, useState } from 'react'
import axios from 'axios'

function Books({ cart, setCart }) {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('title')

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleSearch = () => {
    if (!search) {
      axios.get('http://localhost:8080/api/books')
        .then(res => setBooks(res.data))
      return
    }
    axios.get(`http://localhost:8080/api/books/search/${searchType}?${searchType}=${search}`)
      .then(res => {
        if (Array.isArray(res.data)) setBooks(res.data)
        else setBooks([res.data])
      })
      .catch(() => setBooks([]))
  }

  const addToCart = (book) => {
    const existing = cart.find(item => item.id === book.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...book, quantity: 1 }])
    }
    alert(`${book.title} added to cart!`)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Books</h2>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <select value={searchType} onChange={e => setSearchType(e.target.value)}
          style={{ padding: '0.5rem' }}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
        </select>
        <input placeholder={`Search by ${searchType}...`} value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }} />
        <button onClick={handleSearch}
          style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
        <button onClick={() => { setSearch(''); axios.get('http://localhost:8080/api/books').then(res => setBooks(res.data)) }}
          style={{ padding: '0.5rem 1rem', background: '#666', color: 'white', border: 'none', cursor: 'pointer' }}>
          Clear
        </button>
      </div>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map(b => (
          <div key={b.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
            <h3>{b.title}</h3>
            <p><strong>Author:</strong> {b.author}</p>
            <p><strong>ISBN:</strong> {b.isbn}</p>
            <p><strong>Publisher:</strong> {b.publisher}</p>
            <p><strong>Genre:</strong> {b.genre}</p>
            <p><strong>Price:</strong> ${b.price}</p>
            <p><strong>Stock:</strong> {b.stock} copies</p>
            <button onClick={() => addToCart(b)}
              style={{ background: '#333', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Books