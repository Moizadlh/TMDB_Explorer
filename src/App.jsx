import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/ThemeProvider';

import Signin from '@/pages/SignIn';
import Signup from '@/pages/SignUp';
import Home from '@/pages/Home';
import Movies from '@/pages/Movies';
import MovieDetails from '@/pages/MovieDetails';
import Favourites from '@/pages/Favourites';
import TvShows from '@/pages/TvShows';

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
