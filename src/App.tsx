import { useEffect, useMemo, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { fetchProducts } from "./services/productApi";
import { fetchArticles } from "./services/articleApi";
import { fetchStyles } from "./services/styleApi";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Styles from "./pages/Styles";
import StyleDetails from "./pages/StyleDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Wishlist from "./pages/Wishlist";
import HairstyleChanger from "./pages/HairstyleChanger";

import type { Product, Article, Style, CartItem, WishlistItem, Customer, Order } from "./types";

export default function App() {
  const [, setLocation] = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); // { productId, name, price, qty, image }
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); // { productId, name, price, image }
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      const productData = await fetchProducts();
      const articleData = await fetchArticles();
      const styleData = await fetchStyles();
      setProducts(productData);
      setArticles(articleData);
      setStyles(styleData);
    }
    load();
  }, []);

  function addToCart(product: Product, qty = 1) {
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((x) => x.productId === product.id);
      if (existing) {
        return prev.map((x) =>
          x.productId === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          qty,
          image: product.image
        }
      ];
    });
  }

  function updateQty(productId: number, nextQty: number) {
    const safeQty = Number.isFinite(nextQty) ? nextQty : 1;

    setCart((prev) => {
      if (safeQty <= 0) return prev.filter((x) => x.productId !== productId);
      return prev.map((x) =>
        x.productId === productId ? { ...x, qty: safeQty } : x
      );
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((x) => x.productId !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function addToWishlist(product: Product) {
    if (!product) return;

    setWishlist((prev) => {
      const existing = prev.find((x) => x.productId === product.id);
      if (existing) return prev; // Already in wishlist
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      ];
    });
  }

  function removeFromWishlist(productId: number) {
    setWishlist((prev) => prev.filter((x) => x.productId !== productId));
  }

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingFee = subtotal > 0 ? 5 : 0;
    const grandTotal = subtotal + shippingFee;
    return { subtotal, shippingFee, grandTotal };
  }, [cart]);

  function placeOrder(customer: Customer) {
    // Send order to backend
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customer })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert('Order failed: ' + data.error);
      } else {
        // Redirect to Stripe checkout or handle payment
        // For now, just confirm
        setOrder({ id: data.orderId, ...data });
        clearCart();
        setLocation("/confirmation");
      }
    })
    .catch(err => alert('Order failed: ' + err.message));
  }

  return (
    <>
      <Navbar cartCount={cart.reduce((n, i) => n + i.qty, 0)} wishlistCount={wishlist.length} />

      <div className="container py-4">
        <Switch>
          <Route path="/" component={Home} />

          <Route path="/products">
            <Products 
              products={products} 
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          </Route>

          <Route path="/products/:id">
            {(params) => (
              <ProductDetails
                id={params.id}
                products={products}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                isInWishlist={wishlist.some(w => w.productId === Number(params.id))}
              />
            )}
          </Route>

          <Route path="/articles">
            <Articles articles={articles} />
          </Route>

          <Route path="/articles/:id">
            {(params) => (
              <ArticleDetails
                id={params.id}
                articles={articles}
              />
            )}
          </Route>

          <Route path="/styles">
            <Styles styles={styles} />
          </Route>

          <Route path="/styles/:id">
            {(params) => (
              <StyleDetails
                style={styles.find(s => s.id === Number(params.id))!}
              />
            )}
          </Route>

          <Route path="/wishlist">
            <Wishlist
              wishlist={wishlist}
              onRemove={removeFromWishlist}
              onAddToCart={addToCart}
              products={products}
            />
          </Route>

          <Route path="/cart">
            <Cart
              cart={cart}
              totals={totals}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
            />
          </Route>

          <Route path="/checkout">
            <Checkout cart={cart} totals={totals} onPlaceOrder={placeOrder} />
          </Route>

          <Route path="/confirmation">
            <Confirmation order={order} />
          </Route>

          <Route path="/hairstyle-changer">
            <HairstyleChanger />
          </Route>

          <Route>
            <div className="alert alert-warning">
              Page not found. Please use the navigation menu.
            </div>
          </Route>
        </Switch>
      </div>
    </>
  );
}
