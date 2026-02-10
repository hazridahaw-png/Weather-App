import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import session from 'express-session';
import Replicate from 'replicate';
import bcrypt from 'bcryptjs';

console.log('Starting server...');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
  db.query('SELECT * FROM styles', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Parse JSON fields back to arrays
    const styles = results.map(style => ({
      ...style,
      colorPalette: JSON.parse(style.color_palette || '[]'),
      outfitIdeas: JSON.parse(style.outfit_ideas || '[]'),
      bookRecommendations: JSON.parse(style.book_recommendations || '[]'),
      recipePairings: JSON.parse(style.recipe_pairings || '[]')
    }));
    
    res.json(styles);
  });
});

app.get('/api/styles/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM styles WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Style not found' });
    
    const style = results[0];
    // Parse JSON fields back to arrays
    style.colorPalette = JSON.parse(style.color_palette || '[]');
    style.outfitIdeas = JSON.parse(style.outfit_ideas || '[]');
    style.bookRecommendations = JSON.parse(style.book_recommendations || '[]');
    style.recipePairings = JSON.parse(style.recipe_pairings || '[]');
    
    res.json(style);
  });
});

app.post('/api/hairstyle-change', async (req, res) => {
  try {
    const { image, hairstyle } = req.body;
    
    // For now, return a mock response - in production, integrate with AI API
    // Example APIs to integrate: HairStyle AI, FaceApp, or similar services
    
    const mockResult = {
      originalImage: image,
      resultImage: image, // In production, this would be the processed image from AI API
      hairstyle: hairstyle,
      processingTime: "2.3 seconds",
      message: "Hairstyle change processed successfully (mock response)"
    };
    
    res.json(mockResult);
  } catch (error) {
    console.error('Hairstyle change error:', error);
    res.status(500).json({ error: 'Failed to process hairstyle change' });
  }
});

app.post('/api/orders', async (req, res) => {

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

// User registration
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const checkQuery = 'SELECT id FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const insertQuery = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [firstName, lastName, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating account' });

        res.status(201).json({ message: 'Account created successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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