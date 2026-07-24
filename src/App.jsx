import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/theme-provider';

import Signin from '@/pages/signin';
import Signup from '@/pages/signup';
import Home from '@/pages/home';
import Movies from '@/pages/movies';
import MovieDetails from '@/pages/movie-details';
import Favourites from '@/pages/favourites';
import TvShows from '@/pages/tv-shows';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right"  toastOptions={{duration: 2500,}}/>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
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
