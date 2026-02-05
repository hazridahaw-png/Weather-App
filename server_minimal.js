import express from 'express';
import session from 'express-session';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

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
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    res.redirect('/admin/orders');
  } else {
    res.render('login', { title: 'Admin Login', error: 'Invalid credentials' });
  }
});

app.get('/admin/orders', requireAuth, (req, res) => {
  res.render('orders', {
    title: 'Order Management',
    orders: [],
    totalOrders: 0,
    totalRevenue: '0.00',
    avgOrderValue: '0.00'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});