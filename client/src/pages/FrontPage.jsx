import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import TopLikedVideos from '../components/TopLikedVideos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FrontPage.css';
import Footer from '../components/Footer';

const images = [
  {
    src: '/img/CalgaryNeighbourhoodGuides_desktopHeader_spring-2024.jpg',
    caption: 'Share Calgary\'s Urban Moments',
  },
  {
    src: '/img/calgarybc.jpg',
    caption: 'Encourage Social Engagement',
  },
  {
    src: '/img/OurCityBest_desktopHeader-Spring2025.jpg',
    caption: 'Build Community',
  },
];

const FrontPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const shuffledImages = images
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
    

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    };
  return (
    <div>
      <Navbar />

      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {shuffledImages.map((img, index) => (
            <div key={index} className="carousel-slide">
  <img src={img.src} alt="Calgary Carousel" className="carousel-image" />
  <div className="carousel-text-wrapper">
    <h1 className="carousel-title">{img.caption}</h1>
    <p className="carousel-subtitle">Celebrating the spirit of Calgary through city moments</p>
  </div>
</div>
          ))}
        </Slider>
      </div>

      <div className="top-videos-section">
        <TopLikedVideos onRequestLogin={() => setShowLoginModal(true)} />
      </div>
      <Footer />
    </div>
    
  );

};

export default FrontPage;
