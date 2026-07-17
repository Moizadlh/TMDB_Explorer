import { useState } from 'react'
import heroImg from './assets/hero.png'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard';
import MovieDetails from './pages/movie-details';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
      </BrowserRouter>
      {/* <Auth></Auth> */}
    </>
  )
}

export default App
