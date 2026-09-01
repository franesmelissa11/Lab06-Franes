import React, { useState } from 'react';
import './Family.css';

const BurgerApp = () => {
  const [wishlist, setWishlist] = useState(new Set());

  const burgers = [
    {
      id: 1,
      name: 'Crispy Chicken',
      description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw',
      price: '₹99.15',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Ultimate Bacon',
      description: 'House patty, cheddar cheese, bacon, onion, mustard',
      price: '₹99.32',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Black Sheep',
      description: 'American cheese, tomato relish, avocado, lettuce, red onion',
      price: '₹69.15',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Vegan Burger',
      description: 'House patty, cheddar cheese, bacon, onion, mustard',
      price: '₹99.25',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop'
    }
  ];

  const toggleWishlist = (id) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
    } else {
      newWishlist.add(id);
    }
    setWishlist(newWishlist);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half">★</span>);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  return (
    <div className="burger-app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍔</span>
            <h1>TASTY BURGER</h1>
          </div>
          <nav className="navigation" aria-label="Main navigation">
            <a href="#about">ABOUT</a>
            <a href="#menu">OUR MENU</a>
            <a href="#shop">SHOP</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <div className="cart-icon" aria-label="Shopping cart">
            <span className="cart-symbol">🛒</span>
            <span className="cart-badge">3</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2 className="hero-title">OUR CRAZY BURGERS</h2>
          <p className="hero-description">
            Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy
            patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted
            bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow
            your mind!
          </p>
        </section>

        <section className="burger-grid">
          {burgers.map((burger) => (
            <div key={burger.id} className="burger-card">
              <div className="card-image-container">
                <img src={burger.image} alt={burger.name} className="burger-image" />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <div className="rating" aria-label={`Rating ${burger.rating} out of 5`}>
                    {renderStars(burger.rating)}
                  </div>
                  <button
                    type="button"
                    className={`wishlist-btn ${wishlist.has(burger.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(burger.id)}
                    aria-label={wishlist.has(burger.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    ❤️
                  </button>
                </div>
                <h3 className="burger-name">{burger.name}</h3>
                <p className="burger-description">{burger.description}</p>
                <div className="card-footer">
                  <span className="price">{burger.price}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default BurgerApp;