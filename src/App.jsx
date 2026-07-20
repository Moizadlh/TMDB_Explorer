import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import MovieDetails from './pages/movie-details';
import Favourites from './pages/favourites';
import TvShows from './pages/tv-shows';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/tvshows" element={<TvShows />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
