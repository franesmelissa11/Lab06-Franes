import React, { useState } from 'react';
import './Family.css';

const featuredBurgers = [
  {
    id: 5,
    name: 'Quinoa Veggie',
    description: 'Black bean and quinoa patty with fresh greens and house sauce',
    price: '₹99.15',
    rating: 5,
    image: 'https://shortgirltallorder.com/wp-content/uploads/2020/01/vegan-black-bean-quinoa-veggie-burger-square.jpg'
  },
  {
    id: 6,
    name: 'Garden Stack',
    description: 'A hearty veggie burger layered with crisp, fresh toppings',
    price: '₹99.32',
    rating: 4.5,
    image: 'https://i.pinimg.com/736x/d8/3e/fe/d83efe8e55ee89777f511e06ab1cca46.jpg'
  },
  {
    id: 7,
    name: 'Loaded Veggie',
    description: 'A savory plant-based burger with a generous stack of toppings',
    price: '₹69.15',
    rating: 4,
    image: 'https://i.pinimg.com/736x/ea/db/f7/eadbf7e3f9e6e8b949fda5d112adc78c.jpg'
  }
];

const BurgerApp = () => {
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const burgers = [
    {
      id: 1,
      name: 'Crispy Chicken',
      description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw',
      price: '₹99.15',
      rating: 5,
      image: 'https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg'
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
    },
    ...featuredBurgers
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

  const addToCart = (burger) => {
    setOrderPlaced(false);
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === burger.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === burger.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...burger, quantity: 1 }];
    });
  };

  const changeQuantity = (burger, amount) => {
    setOrderPlaced(false);
    setCart((currentCart) => {
      const updatedCart = currentCart
        .map((item) => item.id === burger.id ? { ...item, quantity: item.quantity + amount } : item)
        .filter((item) => item.quantity > 0);

      if (amount > 0 && !currentCart.some((item) => item.id === burger.id)) {
        return [...updatedCart, { ...burger, quantity: amount }];
      }

      return updatedCart;
    });
  };

  const getQuantity = (burgerId) => cart.find((item) => item.id === burgerId)?.quantity || 0;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price.replace('₹', '')) * item.quantity,
    0
  );

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
          <a className="cart-icon" href="#checkout" aria-label="Go to checkout">
            <span className="cart-symbol">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
        </div>
      </header>

      <section className="featured-slider" aria-label="Featured burgers">
        <a className="featured-slide" href="#menu" aria-label={`Browse ${featuredBurgers[activeSlide].name}`}>
          <img
            className="featured-slide-image"
            src={featuredBurgers[activeSlide].image}
            alt={featuredBurgers[activeSlide].name}
          />
          <span className="featured-slide-caption">{featuredBurgers[activeSlide].name}</span>
        </a>
        <button
          className="slider-control slider-previous"
          type="button"
          aria-label="Show previous burger"
          onClick={() => setActiveSlide((current) => (current - 1 + featuredBurgers.length) % featuredBurgers.length)}
        >
          ‹
        </button>
        <button
          className="slider-control slider-next"
          type="button"
          aria-label="Show next burger"
          onClick={() => setActiveSlide((current) => (current + 1) % featuredBurgers.length)}
        >
          ›
        </button>
        <div className="slider-dots" aria-label="Choose a featured burger">
          {featuredBurgers.map((burger, index) => (
            <button
              key={burger.id}
              className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
              type="button"
              aria-label={`Show ${burger.name}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <main className="main-content">
        <section className="hero-section" id="about">
          <h2 className="hero-title">OUR CRAZY BURGERS</h2>
          <p className="hero-description">
            Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy
            patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted
            bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow
            your mind!
          </p>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Made to order</span>
              <h2>Pick your favorite</h2>
            </div>
            <a className="shop-link" href="#shop">See our specials <span aria-hidden="true">→</span></a>
          </div>
          <div className="burger-grid">
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
                    <span aria-hidden="true">♥</span>
                  </button>
                </div>
                <h3 className="burger-name">{burger.name}</h3>
                <p className="burger-description">{burger.description}</p>
                <div className="card-footer">
                  <span className="price">{burger.price}</span>
                  <div className="quantity-controls" aria-label={`Quantity for ${burger.name}`}>
                    <button
                      className="quantity-button"
                      type="button"
                      onClick={() => changeQuantity(burger, -1)}
                      aria-label={`Remove one ${burger.name}`}
                      disabled={getQuantity(burger.id) === 0}
                    >
                      −
                    </button>
                    <span className="quantity-value">{getQuantity(burger.id)}</span>
                    <button
                      className="quantity-button"
                      type="button"
                      onClick={() => addToCart(burger)}
                      aria-label={`Add one ${burger.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>

        <section className="special-section" id="shop">
          <span className="eyebrow">The weekend drop</span>
          <h2>Two burgers, one impossible choice.</h2>
          <p>Try any two burgers and make it a meal with fries and a chilled drink.</p>
          <a className="primary-button" href="#menu">Build your meal <span aria-hidden="true">↗</span></a>
        </section>

        <section className="checkout-section" id="checkout">
          <div className="checkout-copy">
            <span className="eyebrow">Ready when you are</span>
            <h2>Checkout</h2>
            <p>Fresh off the grill, packed with care, and on its way to you.</p>
          </div>
          {cart.length === 0 ? (
            <div className="empty-checkout">
              <span className="empty-icon" aria-hidden="true">🛍</span>
              <p>Your order is waiting for a burger.</p>
              <a className="primary-button" href="#menu">Browse menu</a>
            </div>
          ) : (
            <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true); }}>
              <div className="order-summary">
                {cart.map((item) => (
                  <div className="order-line" key={item.id}>
                    <span>{item.quantity} × {item.name}</span>
                    <strong>₹{(Number(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="total-line"><span>Total</span><strong>₹{cartTotal.toFixed(2)}</strong></div>
              </div>
              <label>Delivery address<input required placeholder="12 Flavor Street" /></label>
              <label>Payment method<select defaultValue="card"><option value="card">Card ending in 4242</option><option value="cash">Cash on delivery</option></select></label>
              <button className="primary-button checkout-button" type="submit">Place order · ₹{cartTotal.toFixed(2)}</button>
              {orderPlaced && <p className="success-message" role="status">Order received. Your burgers are on the grill.</p>}
            </form>
          )}
        </section>

        <footer className="footer" id="contact">
          <span>TASTY BURGER</span>
          <a href="mailto:hello@tastyburger.example">hello@tastyburger.example</a>
        </footer>
      </main>
    </div>
  );
};

export default BurgerApp;