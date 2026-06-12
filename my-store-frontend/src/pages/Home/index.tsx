import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Truck, ShieldCheck, Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/logo/bg-sale.png',
    title: 'Elevate Your Style',
    subtitle: 'Discover our latest collection of premium fashion designed for everyday elegance.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000',
    title: 'Winter Collection 2026',
    subtitle: 'Stay warm without compromising your minimal aesthetics.'
  },
  {
    id: 3,
    image: '/logo/minimal.jpg',
    title: 'Minimalist Accessories',
    subtitle: 'The perfect details to complete your everyday look.'
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <Link to={ROUTES.PRODUCTS} className="hero-btn">
                Shop New Arrivals
              </Link>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button className="slider-btn slider-btn-left" onClick={prevSlide} aria-label="Previous slide"><ChevronLeft size={32} /></button>
        <button className="slider-btn slider-btn-right" onClick={nextSlide} aria-label="Next slide"><ChevronRight size={32} /></button>
        
        {/* Slider Indicators */}
        <div className="slider-indicators">
          {HERO_SLIDES.map((_, index) => (
            <button 
              key={index} 
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand Features Section */}
      <section className="features">
        <div className="feature-item">
          <Truck className="feature-icon" size={32} />
          <h3 className="feature-title">Free Shipping</h3>
          <p className="feature-desc">On all orders over ฿1,000</p>
        </div>
        <div className="feature-item">
          <ShieldCheck className="feature-icon" size={32} />
          <h3 className="feature-title">Secure Payment</h3>
          <p className="feature-desc">100% secure checkout</p>
        </div>
        <div className="feature-item">
          <RefreshCw className="feature-icon" size={32} />
          <h3 className="feature-title">Easy Returns</h3>
          <p className="feature-desc">7 days return policy</p>
        </div>
        <div className="feature-item">
          <Clock className="feature-icon" size={32} />
          <h3 className="feature-title">24/7 Support</h3>
          <p className="feature-desc">Always here to help you</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {/* Men Category */}
          <Link to={ROUTES.PRODUCTS} className="category-card">
            <img 
              src="/logo/mencollection.png" 
              alt="Men Fashion" 
              className="category-img"
            />
            <div className="category-overlay">
              <h3 className="category-name">Men's Collection</h3>
              <span className="category-link-text">Shop Now →</span>
            </div>
          </Link>

          {/* Women Category */}
          <Link to={ROUTES.PRODUCTS} className="category-card">
            <img 
              src="/logo/womencollection.png" 
              alt="Women Fashion" 
              className="category-img"
            />
            <div className="category-overlay">
              <h3 className="category-name">Women's Collection</h3>
              <span className="category-link-text">Shop Now →</span>
            </div>
          </Link>

          {/* Accessories Category */}
          <Link to={ROUTES.PRODUCTS} className="category-card">
            <img 
              src="/logo/asscessories.png" 
              alt="Accessories" 
              className="category-img"
            />
            <div className="category-overlay">
              <h3 className="category-name">Accessories</h3>
              <span className="category-link-text">Shop Now →</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
