import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import session from 'express-session';

console.log('Starting server...');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for admin authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files for admin
app.use('/admin', express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lifestyle_shop'
});

console.log('Connecting to database...');
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Daily-Dose API Server is running. Frontend is at http://localhost:5173');
});

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

app.get('/api/styles', (req, res) => {
  // For now, serve static styles data (could be moved to database later)
  const styles = [
    {
      "id": 1,
      "name": "Cottagecore",
      "description": "Cottagecore is a lifestyle and aesthetic centered around rural, agrarian life. It emphasizes simplicity, self-sufficiency, and a connection to nature. Think floral dresses, gardening, baking, and cozy evenings by the fireplace.",
      "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#8B7355", "#D4A574", "#F5F5DC", "#228B22", "#8FBC8F"],
      "outfitIdeas": ["Floral sundresses with lace details", "Denim overalls and work boots", "Linen button-up shirts", "Wide-brimmed sun hats", "Canvas aprons for gardening"],
      "bookRecommendations": ["The Secret Garden by Frances Hodgson Burnett", "Anne of Green Gables by L.M. Montgomery", "The Cottage Tales of Beatrix Potter", "Walden by Henry David Thoreau", "The Herbal Medicine-Maker's Handbook by James A. Duke"],
      "recipePairings": ["Fresh berry scones with clotted cream", "Herbal teas and wildflower honey", "Homemade vegetable soup with garden herbs", "Apple cider vinegar salad dressing", "Fresh bread with butter and jam"],
      "mood": "Peaceful, nostalgic, grounded",
      "season": "Spring/Summer"
    },
    {
      "id": 2,
      "name": "Minimalist",
      "description": "Minimalism focuses on living with less. It's about intentionality, quality over quantity, and creating space for what truly matters. Clean lines, neutral colors, and functional design define this aesthetic.",
      "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FFFFFF", "#F5F5F5", "#000000", "#808080", "#C0C0C0"],
      "outfitIdeas": ["Monochrome capsule wardrobe", "Tailored blazers and trousers", "White button-down shirts", "Clean sneakers or loafers", "Timeless trench coats"],
      "bookRecommendations": ["The Life-Changing Magic of Tidying Up by Marie Kondo", "Less Is More by Jason Hickel", "The Minimalist Home by Joshua Becker", "Goodbye, Things by Fumio Sasaki", "Essentialism by Greg McKeown"],
      "recipePairings": ["Simple green salads with olive oil", "Oatmeal with fresh fruit", "Grilled chicken with steamed vegetables", "Smoothies with minimal ingredients", "Herbal tea with lemon"],
      "mood": "Calm, focused, intentional",
      "season": "Year-round"
    },
    {
      "id": 3,
      "name": "Dark Academia",
      "description": "Dark Academia draws inspiration from classic literature, Gothic architecture, and intellectual pursuits. It combines scholarly aesthetics with moody, atmospheric elements. Think tweed jackets, vintage books, and candlelit study sessions.",
      "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#2F1B14", "#8B4513", "#DAA520", "#800080", "#4B0082"],
      "outfitIdeas": ["Tweed blazers and waistcoats", "Oxford shirts and chinos", "Cable knit sweaters", "Leather brogues", "Academic robes and scarves"],
      "bookRecommendations": ["Ninth House by Leigh Bardugo", "Bunny by Mona Awad", "The Maidens by Alex Michaelides", "Catherine House by Elisabeth Thomas", "The Atlas Six by Olivie Blake"],
      "recipePairings": ["Earl Grey tea with scones", "Dark chocolate and red wine", "Roasted root vegetables", "Herb-crusted lamb", "Mulled wine and cheese platters"],
      "mood": "Intellectual, mysterious, elegant",
      "season": "Fall/Winter"
    },
    {
      "id": 4,
      "name": "Streetwear",
      "description": "Streetwear originated from skate and hip-hop culture, evolving into a global fashion movement. It celebrates urban style, bold graphics, oversized silhouettes, and street art influences. Comfort meets edge in this dynamic aesthetic.",
      "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FF0000", "#000000", "#FFFFFF", "#FFD700", "#FF4500"],
      "outfitIdeas": ["Oversized hoodies and cargo pants", "Graphic tees and sneakers", "Bucket hats and beanies", "Layered chains and jewelry", "Bomber jackets with patches"],
      "bookRecommendations": ["The Art of Streetwear by Emma McClendon", "Streetwear: The Insider's Guide by Alex Badia", "Can't Stop Won't Stop by Jeff Chang", "Style Like U by Chloe Hilliard", "Fresh Prince by Carlton Howard"],
      "recipePairings": ["Street tacos with bold spices", "Energy drinks and protein bars", "Bubble tea and boba", "Korean fried chicken", "Ramen bowls with extra toppings"],
      "mood": "Energetic, confident, urban",
      "season": "Year-round"
    },
    {
      "id": 5,
      "name": "Cozy Winter",
      "description": "Cozy Winter embraces the comfort and warmth of the colder months. It's all about soft textures, warm beverages, and creating a sanctuary from the chill. Think fuzzy blankets, hot cocoa, and the joy of staying in.",
      "image": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#8B4513", "#DC143C", "#FF6347", "#F5DEB3", "#2F4F4F"],
      "outfitIdeas": ["Chunky knit sweaters and scarves", "Thermal leggings and boots", "Fleece-lined jackets", "Wool socks and slippers", "Turtlenecks and cardigans"],
      "bookRecommendations": ["The Winter People by Jennifer McMahon", "Winter by Marissa Meyer", "The Bear and the Nightingale by Katherine Arden", "The Snow Child by Eowyn Ivey", "Winter's Orbit by Everina Maxwell"],
      "recipePairings": ["Hot chocolate with marshmallows", "Spiced apple cider", "Creamy soups and stews", "Gingerbread cookies", "Mulled wine and hot toddies"],
      "mood": "Warm, comforting, introspective",
      "season": "Winter"
    },
    {
      "id": 6,
      "name": "Sneakers Take Center Stage",
      "description": "Sneakers Take Center Stage celebrates the sneaker as the ultimate fashion statement. From vintage collectibles to limited-edition drops, this aesthetic is all about the perfect pair of kicks that elevate any outfit. It's about the culture, the community, and the endless possibilities of sneaker styling.",
      "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#1E3A8A"],
      "outfitIdeas": ["Premium sneakers with tailored suits", "Athleisure sets with statement sneakers", "Streetwear looks with vintage finds", "Casual jeans and sneakers combos", "Sneaker matching sets and accessories"],
      "bookRecommendations": ["Sneaker Wars by Barbara Smit", "The Sneaker Book by Tom Vanderbilt", "Kicks by Nicholas Smith", "Sneakers: The Complete Collectors Guide by Unorthodox Styles", "The Art of Sneaking by Ali Edwards"],
      "recipePairings": ["Craft beer and pretzels", "Loaded nachos and energy drinks", "Street-style tacos", "Bubble tea and boba", "Protein smoothies and granola bars"],
      "mood": "Energetic, trendy, expressive",
      "season": "Year-round"
    }
  ];
  res.json(styles);
});

app.get('/api/styles/:id', (req, res) => {
  const { id } = req.params;
  // For now, serve static styles data
  const styles = [
    {
      "id": 1,
      "name": "Cottagecore",
      "description": "Cottagecore is a lifestyle and aesthetic centered around rural, agrarian life. It emphasizes simplicity, self-sufficiency, and a connection to nature. Think floral dresses, gardening, baking, and cozy evenings by the fireplace.",
      "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#8B7355", "#D4A574", "#F5F5DC", "#228B22", "#8FBC8F"],
      "outfitIdeas": ["Floral sundresses with lace details", "Denim overalls and work boots", "Linen button-up shirts", "Wide-brimmed sun hats", "Canvas aprons for gardening"],
      "bookRecommendations": ["The Secret Garden by Frances Hodgson Burnett", "Anne of Green Gables by L.M. Montgomery", "The Cottage Tales of Beatrix Potter", "Walden by Henry David Thoreau", "The Herbal Medicine-Maker's Handbook by James A. Duke"],
      "recipePairings": ["Fresh berry scones with clotted cream", "Herbal teas and wildflower honey", "Homemade vegetable soup with garden herbs", "Apple cider vinegar salad dressing", "Fresh bread with butter and jam"],
      "mood": "Peaceful, nostalgic, grounded",
      "season": "Spring/Summer"
    },
    {
      "id": 2,
      "name": "Minimalist",
      "description": "Minimalism focuses on living with less. It's about intentionality, quality over quantity, and creating space for what truly matters. Clean lines, neutral colors, and functional design define this aesthetic.",
      "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FFFFFF", "#F5F5F5", "#000000", "#808080", "#C0C0C0"],
      "outfitIdeas": ["Monochrome capsule wardrobe", "Tailored blazers and trousers", "White button-down shirts", "Clean sneakers or loafers", "Timeless trench coats"],
      "bookRecommendations": ["The Life-Changing Magic of Tidying Up by Marie Kondo", "Less Is More by Jason Hickel", "The Minimalist Home by Joshua Becker", "Goodbye, Things by Fumio Sasaki", "Essentialism by Greg McKeown"],
      "recipePairings": ["Simple green salads with olive oil", "Oatmeal with fresh fruit", "Grilled chicken with steamed vegetables", "Smoothies with minimal ingredients", "Herbal tea with lemon"],
      "mood": "Calm, focused, intentional",
      "season": "Year-round"
    },
    {
      "id": 3,
      "name": "Dark Academia",
      "description": "Dark Academia draws inspiration from classic literature, Gothic architecture, and intellectual pursuits. It combines scholarly aesthetics with moody, atmospheric elements. Think tweed jackets, vintage books, and candlelit study sessions.",
      "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#2F1B14", "#8B4513", "#DAA520", "#800080", "#4B0082"],
      "outfitIdeas": ["Tweed blazers and waistcoats", "Oxford shirts and chinos", "Cable knit sweaters", "Leather brogues", "Academic robes and scarves"],
      "bookRecommendations": ["Ninth House by Leigh Bardugo", "Bunny by Mona Awad", "The Maidens by Alex Michaelides", "Catherine House by Elisabeth Thomas", "The Atlas Six by Olivie Blake"],
      "recipePairings": ["Earl Grey tea with scones", "Dark chocolate and red wine", "Roasted root vegetables", "Herb-crusted lamb", "Mulled wine and cheese platters"],
      "mood": "Intellectual, mysterious, elegant",
      "season": "Fall/Winter"
    },
    {
      "id": 4,
      "name": "Streetwear",
      "description": "Streetwear originated from skate and hip-hop culture, evolving into a global fashion movement. It celebrates urban style, bold graphics, oversized silhouettes, and street art influences. Comfort meets edge in this dynamic aesthetic.",
      "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FF0000", "#000000", "#FFFFFF", "#FFD700", "#FF4500"],
      "outfitIdeas": ["Oversized hoodies and cargo pants", "Graphic tees and sneakers", "Bucket hats and beanies", "Layered chains and jewelry", "Bomber jackets with patches"],
      "bookRecommendations": ["The Art of Streetwear by Emma McClendon", "Streetwear: The Insider's Guide by Alex Badia", "Can't Stop Won't Stop by Jeff Chang", "Style Like U by Chloe Hilliard", "Fresh Prince by Carlton Howard"],
      "recipePairings": ["Street tacos with bold spices", "Energy drinks and protein bars", "Bubble tea and boba", "Korean fried chicken", "Ramen bowls with extra toppings"],
      "mood": "Energetic, confident, urban",
      "season": "Year-round"
    },
    {
      "id": 5,
      "name": "Cozy Winter",
      "description": "Cozy Winter embraces the comfort and warmth of the colder months. It's all about soft textures, warm beverages, and creating a sanctuary from the chill. Think fuzzy blankets, hot cocoa, and the joy of staying in.",
      "image": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#8B4513", "#DC143C", "#FF6347", "#F5DEB3", "#2F4F4F"],
      "outfitIdeas": ["Chunky knit sweaters and scarves", "Thermal leggings and boots", "Fleece-lined jackets", "Wool socks and slippers", "Turtlenecks and cardigans"],
      "bookRecommendations": ["The Winter People by Jennifer McMahon", "Winter by Marissa Meyer", "The Bear and the Nightingale by Katherine Arden", "The Snow Child by Eowyn Ivey", "Winter's Orbit by Everina Maxwell"],
      "recipePairings": ["Hot chocolate with marshmallows", "Spiced apple cider", "Creamy soups and stews", "Gingerbread cookies", "Mulled wine and hot toddies"],
      "mood": "Warm, comforting, introspective",
      "season": "Winter"
    },
    {
      "id": 6,
      "name": "Sneakers Take Center Stage",
      "description": "Sneakers Take Center Stage celebrates the sneaker as the ultimate fashion statement. From vintage collectibles to limited-edition drops, this aesthetic is all about the perfect pair of kicks that elevate any outfit. It's about the culture, the community, and the endless possibilities of sneaker styling.",
      "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80",
      "colorPalette": ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#1E3A8A"],
      "outfitIdeas": ["Premium sneakers with tailored suits", "Athleisure sets with statement sneakers", "Streetwear looks with vintage finds", "Casual jeans and sneakers combos", "Sneaker matching sets and accessories"],
      "bookRecommendations": ["Sneaker Wars by Barbara Smit", "The Sneaker Book by Tom Vanderbilt", "Kicks by Nicholas Smith", "Sneakers: The Complete Collectors Guide by Unorthodox Styles", "The Art of Sneaking by Ali Edwards"],
      "recipePairings": ["Craft beer and pretzels", "Loaded nachos and energy drinks", "Street-style tacos", "Bubble tea and boba", "Protein smoothies and granola bars"],
      "mood": "Energetic, trendy, expressive",
      "season": "Year-round"
    }
  ];
  const style = styles.find(s => s.id === parseInt(id));
  if (!style) return res.status(404).json({ error: 'Style not found' });
  res.json(style);
});

app.post('/api/orders', async (req, res) => {
  const { items, customer } = req.body;

  try {
    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0) + 5; // + shipping

    // Comment out Stripe payment for testing
    /*
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // cents
      currency: 'usd',
      metadata: { customer_email: customer.email }
    });
    */

    // Save order to DB
    const orderQuery = 'INSERT INTO orders (customer_name, customer_email, total, payment_intent_id) VALUES (?, ?, ?, ?)';
    db.query(orderQuery, [customer.fullName, customer.email, total, 'test-payment-' + Date.now()], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const orderId = result.insertId;

      // Save order items
      const itemQueries = items.map(item =>
        new Promise((resolve, reject) => {
          db.query('INSERT INTO order_items (order_id, product_id, name, price, qty) VALUES (?, ?, ?, ?, ?)',
            [orderId, item.productId, item.name, item.price, item.qty], (err) => {
              if (err) reject(err);
              else resolve();
            });
        })
      );

      Promise.all(itemQueries).then(() => {
        // Comment out Stripe response for testing
        // res.json({ clientSecret: paymentIntent.client_secret, orderId });
        
        // Return full order details for testing
        res.json({ 
          orderId, 
          message: 'Order placed successfully (payment commented out for testing)',
          items: items,
          customer: customer,
          totals: { subtotal: total - 5, shippingFee: 5, grandTotal: total }
        });
      }).catch(err => res.status(500).json({ error: err.message }));
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin authentication middleware
function requireAuth(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/admin/login');
}

// Admin routes
app.get('/admin/login', (req, res) => {
  res.render('login', { title: 'Admin Login', error: null });
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Simple authentication - in production, use proper authentication
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    res.redirect('/admin/orders');
  } else {
    res.render('login', { title: 'Admin Login', error: 'Invalid credentials' });
  }
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

app.get('/admin/orders', requireAuth, (req, res) => {
  db.query(`
    SELECT o.*, COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `, (err, orders) => {
    if (err) return res.status(500).send('Database error');
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';
    
    res.render('orders', { 
      title: 'Order Management', 
      orders,
      totalOrders,
      totalRevenue,
      avgOrderValue
    });
  });
});

app.get('/admin/orders/:id', requireAuth, (req, res) => {
  const orderId = req.params.id;
  
  // Get order details
  db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, orderResults) => {
    if (err) return res.status(500).send('Database error');
    if (orderResults.length === 0) return res.status(404).send('Order not found');
    
    const order = orderResults[0];
    
    // Get order items
    db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId], (err, itemResults) => {
      if (err) return res.status(500).send('Database error');
      
      order.items = itemResults;
      order.item_count = itemResults.length;
      
      res.render('order-detail', { 
        title: `Order #${orderId}`, 
        order
      });
    });
  });
});

app.get('/admin/products', requireAuth, (req, res) => {
  db.query('SELECT * FROM products ORDER BY name', (err, products) => {
    if (err) return res.status(500).send('Database error');
    
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0).toFixed(2);
    
    res.render('products', { 
      title: 'Product Management', 
      products,
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalValue
    });
  });
});

app.post('/admin/products/:id/stock', requireAuth, (req, res) => {
  const productId = req.params.id;
  const { stock } = req.body;
  
  db.query('UPDATE products SET stock = ? WHERE id = ?', [stock, productId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});