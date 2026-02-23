# Daily Dose - AI-Powered Lifestyle Platform

An AI-powered lifestyle platform that curates personalized recommendations for reading, fashion, and cooking based on your mood, energy levels, and aesthetic preferences. Features a comprehensive Stylepedia, e-commerce functionality, and intelligent lifestyle curation.

## ✨ Features

### 🤖 AI Lifestyle Curator
- **Personalized Recommendations**: Get daily suggestions for what to read, wear, and cook based on your current mood, energy level, and time of day
- **Mood-Based Curation**: Interactive sliders for mood (😢 Sad to 😊 Happy) and energy (🪫 Low to ⚡ High)
- **AI-Powered**: Uses Replicate AI to generate contextual recommendations
- **Real-time Feedback**: Instant suggestions with beautiful card layouts

### 🎨 Stylepedia
- **6 Unique Aesthetic Styles**: Cottagecore, Minimalist, Dark Academia, Streetwear, Cozy Winter, and Sneakers Take Center Stage
- **Detailed Style Profiles**: Color palettes, outfit ideas, book recommendations, and recipe pairings
- **Interactive Design**: Beautiful card layouts with hover effects and detailed style pages

### 🛒 E-Commerce
- Product catalog with MySQL database
- Shopping cart functionality
- Order management system
- Stripe payment integration (commented out for testing)

### 👤 User Authentication
- User registration and login system
- Secure password hashing with bcrypt
- Session management with localStorage
- Protected user accounts

### 👨‍💼 Admin Panel
- Order management dashboard
- Product inventory control
- Article content management (Create, Read, Update, Delete, View, Duplicate)
- Style guide management (Create, Read, Update, Delete, View, Duplicate)
- Analytics and reporting
- Secure authentication

### 🔔 Notifications
- Web push notification setup for daily recommendations
- Service worker integration for background notifications

### 🛠️ Tech Stack
- **Frontend**: React + Vite + Bootstrap
- **Backend**: Node.js + Express
- **Database**: MySQL
- **AI**: Replicate API for content generation
- **Authentication**: bcrypt for password hashing
- **State Management**: React hooks
- **API**: RESTful endpoints

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL/MariaDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hazridahaw-png/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Start MySQL/MariaDB service
   sudo service mysql start  # or mariadb

   # Create database and tables
   mysql -u root -p < database.sql
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials:
   # DB_HOST=localhost
   # DB_USER=root
   # DB_PASSWORD=your_password
   # DB_NAME=lifestyle_shop
   # REPLICATE_API_TOKEN=your_replicate_token
   # STRIPE_SECRET_KEY=your_stripe_key
   # SESSION_SECRET=your_session_secret
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Start the backend
   npm run server

   # Terminal 2: Start the frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5000/admin

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.jsx  # Product display cards
│   ├── StyleCard.jsx    # Style preview cards
│   ├── Navbar.jsx       # Navigation component
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx         # Landing page with mood widgets
│   ├── Curator.jsx      # AI lifestyle curator
│   ├── Login.jsx        # User login page
│   ├── Registration.jsx # User registration
│   ├── Products.jsx     # Product catalog
│   ├── ProductDetails.jsx # Individual product pages
│   ├── Articles.jsx     # Article/blog listing
│   ├── ArticleDetails.jsx # Individual article pages
│   ├── Styles.jsx       # Stylepedia main page
│   ├── StyleDetails.jsx # Individual style pages
│   ├── Cart.jsx         # Shopping cart
│   ├── Checkout.jsx     # Payment checkout
│   ├── Wishlist.jsx     # User wishlist
│   ├── HairstyleChanger.jsx # AI hairstyle tool
│   └── ...
├── services/            # API service functions
│   ├── productApi.js    # Product data fetching
│   ├── articleApi.js    # Article data fetching
│   ├── styleApi.js      # Style data fetching
│   └── ...
└── App.jsx             # Main app component

public/
├── sw.js              # Service worker for notifications
├── json/
│   ├── articles.json   # Static article data
│   ├── products.json   # Static product data
│   └── styles.json     # Static style data
└── ...

views/                  # EJS templates for admin panel
├── login.ejs
├── orders.ejs
├── products.ejs
├── articles.ejs
├── styles.ejs
└── ...

server.js               # Express backend server
database.sql            # MySQL database schema
vite.config.js          # Vite configuration with API proxy
```

## 🔌 API Endpoints

### 🤖 AI Recommendations
- `POST /api/recommendations` - Get personalized lifestyle suggestions based on mood, energy, and time

### 👤 Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### 🎨 Styles
- `GET /api/styles` - Get all styles
- `GET /api/styles/:id` - Get style by ID
- `POST /api/styles` - Create new style (admin)
- `PUT /api/styles/:id` - Update style (admin)
- `DELETE /api/styles/:id` - Delete style (admin)

### 🛒 Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### 📝 Content
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create new article (admin)
- `PUT /api/articles/:id` - Update article (admin)
- `DELETE /api/articles/:id` - Delete article (admin)

### 🛍️ Orders
- `POST /api/orders` - Create new order

### 🎨 AI Features
- `POST /api/hairstyle-change` - AI hairstyle transformation

### 👨‍💼 Admin
- `GET /admin/login` - Admin login page
- `POST /admin/login` - Admin authentication
- `GET /admin/logout` - Admin logout
- `GET /admin/orders` - Order management dashboard
- `GET /admin/products` - Product management
- `POST /admin/products/:id/stock` - Update product stock
- `GET /admin/articles` - Article management
- `GET /admin/styles` - Style management

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start backend server
- `npm run preview` - Preview production build

### Database Schema
The application uses MySQL with the following main tables:
- `users` - User accounts with authentication
- `products` - Product catalog with vegan/organic flags
- `orders` - Customer orders
- `order_items` - Order line items
- `articles` - Blog articles and lifestyle content
- `styles` - Aesthetic style guides with detailed profiles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## 🚀 Future Enhancements

- [x] AI Lifestyle Curator with mood-based recommendations
- [x] User authentication and profiles
- [x] AI Hairstyle Changer integration
- [ ] Social sharing features for recommendations
- [ ] Mobile app version
- [ ] Advanced search and filtering
- [ ] Personalized style recommendations based on user history
- [ ] Subscription system for premium AI features
- [ ] Weather-based recommendation integration
- [ ] Community features and user-generated content
- [ ] Integration with external recipe APIs
- [ ] Push notification scheduling for daily recommendations
