import { Routes, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  );
}