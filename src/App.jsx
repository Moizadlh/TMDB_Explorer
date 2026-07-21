import Auth from './pages/auth';
import Home from './pages/home';
import Movies from './pages/movies';
import MovieDetails from './pages/movie-details';
import Favourites from './pages/favourites';
import TvShows from './pages/tv-shows';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/tvshows" element={<TvShows />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
