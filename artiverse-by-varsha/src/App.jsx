
import { useState } from "react";
import "./App.css";
import products from "./products";

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Crochet Keychains",
    "Crochet Flowers & Bouquets",
    "Crochet Accessories",
    "Crochet Plushies",
  ];

  const categoryDetails = [
    {
      name: "Crochet Keychains",
      emoji: "🧸",
      description: "Little cuties to carry everywhere",
    },
    {
      name: "Crochet Flowers & Bouquets",
      emoji: "🌷",
      description: "Flowers that last forever",
    },
    {
      name: "Crochet Accessories",
      emoji: "🎀",
      description: "Add a handmade touch to your style",
    },
    {
      name: "Crochet Plushies",
      emoji: "🐻",
      description: "Huggable handmade happiness",
    },
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const featuredProducts = [1, 7, 3, 8]
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // INSTAGRAM ORDER FUNCTION
  const handleInstagramOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add something cute first 💜");
      return;
    }

    const orderMessage = `
Hello Artiverse by Varsha! 💜

I would like to place an order.

${cart
  .map(
    (item) =>
      `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
  )
  .join("\n")}

Total: ₹${cartTotal}

Please let me know the availability and order details.

Thank you! 🌷
    `.trim();

    try {
      await navigator.clipboard.writeText(orderMessage);

      window.open(
        "https://www.instagram.com/artiverse_by_varsha/",
        "_blank"
      );

      alert(
        "Your order summary is copied! Paste it in our Instagram DM 💜"
      );
    } catch (error) {
      window.open(
        "https://www.instagram.com/artiverse_by_varsha/",
        "_blank"
      );

      alert(
        "Instagram opened! Please share your cart details in our DM 💜"
      );
    }
  };

  const showCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const ProductCard = ({ product }) => (
    <div className="product-card" key={product.id}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-bottom">
          <span className="product-price">₹{product.price}</span>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart +
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">

      {/* ANNOUNCEMENT */}
      <div className="announcement">
        ♡ Little handmade things, made with lots of love ♡
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home" className="logo">
          Artiverse <span>by Varsha</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Collections</a>
          <a href="#shop">Shop</a>
          <a href="#about">Our Story</a>
          <a href="#contact">Contact</a>
          <a href="#cart" className="cart-link">
            Cart ({cartCount})
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-tag">✿ HANDMADE WITH LOVE ✿</p>

          <h1>
            Little things,
            <br />
            <span>made with love.</span>
          </h1>

          <p className="hero-description">
            Discover adorable crochet creations, everlasting flowers
            and handmade treasures crafted to make your everyday special.
          </p>

          <div className="hero-highlights">
            <span>♡ Handmade</span>
            <span>♡ Custom Orders</span>
            <span>♡ Perfect for Gifting</span>
          </div>

          <div className="hero-buttons">
            <button
              className="hero-shop-btn"
              onClick={() =>
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Collection →
            </button>

            <button
              className="hero-story-btn"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Our Story
            </button>
          </div>

          <p className="hero-note">
            Made by hand, treasured forever ♡
          </p>
        </div>

        <div className="hero-image">
          <img
            src="/src/assets/hero.png"
            alt="Handmade crochet creations by Artiverse"
          />

          <div className="hero-floating-note">
            <span>🌷</span>
            <div>
              <strong>Made with love</strong>
              <small>One stitch at a time</small>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div>🧶 Handmade with Care</div>
        <div>🎀 Customised Creations</div>
        <div>🌷 Thoughtful Gifting</div>
        <div>💜 Made Just for You</div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section" id="categories">
        <div className="section-heading">
          <p className="section-tag">A LITTLE SOMETHING FOR EVERYONE</p>
          <h2>Explore Our Collections</h2>
          <p>Find something that makes your heart smile.</p>
        </div>

        <div className="category-grid">
          {categoryDetails.map((item) => {
            const categoryProduct = products.find(
              (product) => product.category === item.name
            );

            return (
              <div
                className="category-card"
                key={item.name}
                onClick={() => showCategory(item.name)}
              >
                {categoryProduct && (
                  <img
                    src={categoryProduct.image}
                    alt={item.name}
                  />
                )}

                <div className="category-content">
                  <span>{item.emoji}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button>Explore →</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-section">
        <div className="section-heading">
          <p className="section-tag">OUR LITTLE FAVOURITES</p>
          <h2>Made with Love</h2>
          <p>Some handmade happiness we think you'll love.</p>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <button
          className="view-all-btn"
          onClick={() => {
            setCategory("All");
            document.getElementById("shop")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          View All Creations →
        </button>
      </section>

      {/* GIFT BANNER */}
      <section className="gift-banner">
        <div>
          <p>♡ A GIFT THAT LASTS FOREVER ♡</p>
          <h2>Give someone a little handmade happiness.</h2>
          <p>
            Thoughtful gifts, adorable details and lots of love in
            every stitch.
          </p>

          <button
            onClick={() =>
              document.getElementById("shop")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Find Your Gift →
          </button>
        </div>

        <span className="gift-emoji">🎁🌷</span>
      </section>

      {/* SHOP */}
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <p className="section-tag">THE HANDMADE COLLECTION</p>
          <h2>Shop All Creations</h2>
          <p>Every piece is made with patience and love.</p>
        </div>

        <div className="category-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active-filter" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No products found in this collection.
          </p>
        )}
      </section>

      {/* WHY ARTIVERSE */}
      <section className="why-section">
        <div className="section-heading">
          <p className="section-tag">THE ARTIVERSE PROMISE</p>
          <h2>Why Handmade?</h2>
          <p>Because little details make the biggest difference.</p>
        </div>

        <div className="why-grid">
          <div>
            <span>🧶</span>
            <h3>Made by Hand</h3>
            <p>Each creation is carefully handmade, one stitch at a time.</p>
          </div>

          <div>
            <span>💜</span>
            <h3>Made with Love</h3>
            <p>Every piece carries a little love and a lot of creativity.</p>
          </div>

          <div>
            <span>🎀</span>
            <h3>Unique Creations</h3>
            <p>Handmade treasures that make your everyday special.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-content">
          <p className="section-tag">A LITTLE ABOUT US</p>
          <h2>Every stitch tells a story.</h2>

          <p>
            Welcome to Artiverse by Varsha, a little world filled with
            handmade crochet creations, everlasting flowers and
            thoughtful treasures.
          </p>

          <p>
            What makes each creation special is the time, creativity
            and love that goes into making it. We believe handmade
            things carry feelings that ordinary things cannot.
          </p>

          <p className="about-signature">
            With love, Varsha ♡
          </p>
        </div>

        <div className="about-decoration">🧶🌷🎀</div>
      </section>

      {/* CART */}
      <section className="cart-section" id="cart">
        <div className="section-heading">
          <p className="section-tag">YOUR LITTLE SHOPPING BAG</p>
          <h2>Your Cart ♡</h2>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span>🛍️</span>
            <h3>Your cart is waiting for some cuteness!</h3>
            <p>Add your favourite handmade creations to get started.</p>

            <button
              onClick={() =>
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total: ₹{cartTotal}</h3>

              <button onClick={handleInstagramOrder}>
                Order via Instagram 💜
              </button>
            </div>
          </div>
        )}
      </section>

     
{/* CONTACT */}
<section className="contact-section" id="contact">
  <p className="section-tag">A LITTLE LOVE GOES A LONG WAY</p>

  <h2>Let's be friends on Instagram! 💜</h2>

  <p>
    Follow our little handmade world for new creations,
    cute updates, custom orders and lots of crochet love.
  </p>

  <a
    href="https://www.instagram.com/artiverse_by_varsha/"
    target="_blank"
    rel="noreferrer"
    className="instagram-button"
  >
    ✿ Follow Our Little World ♡
  </a>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <h2>
          Artiverse <span>by Varsha</span>
        </h2>

        <p>Little things, made with love. ♡</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">Our Story</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="copyright">
          © 2026 Artiverse by Varsha. Made with love ♡
        </p>
      </footer>

    </div>
  );
}

export default App;
