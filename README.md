# Daily-Dose Lifestyle App

A comprehensive lifestyle and fashion application built with React, TypeScript, and Vite. Features a Stylepedia with aesthetic guides, e-commerce functionality, and admin management.

## Features

### 🎨 Stylepedia
- **6 Unique Aesthetic Styles**: Cottagecore, Minimalist, Dark Academia, Streetwear, Cozy Winter, and Sneakers Take Center Stage
- **Detailed Style Profiles**: Color palettes, outfit ideas, book recommendations, and recipe pairings
- **Interactive Design**: Beautiful card layouts with hover effects and detailed style pages

### 🛒 E-Commerce
- Product catalog with MySQL database
- Shopping cart functionality
- Order management system
- Stripe payment integration (commented out for testing)

### 👨‍💼 Admin Panel
- Order management dashboard
- Product inventory control
- Analytics and reporting
- Secure authentication

### 🛠️ Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Styling**: Bootstrap
- **State Management**: React hooks
- **API**: RESTful endpoints

## Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL
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
   # Import the database schema
   mysql -u root -p < database.sql
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
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

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StyleCard.tsx   # Style preview cards
│   ├── Navbar.tsx      # Navigation component
│   └── ...
├── pages/              # Page components
│   ├── Styles.tsx      # Stylepedia main page
│   ├── StyleDetails.tsx # Individual style pages
│   └── ...
├── services/           # API service functions
│   ├── styleApi.ts     # Style data fetching
│   └── ...
└── types.ts           # TypeScript type definitions

public/
├── json/
│   └── styles.json     # Static style data fallback
└── ...

views/                  # EJS templates for admin panel
├── login.ejs
├── orders.ejs
└── ...
```

## API Endpoints

### Styles
- `GET /api/styles` - Get all styles
- `GET /api/styles/:id` - Get style by ID

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order

### Admin
- `GET /admin/login` - Admin login page
- `GET /admin/orders` - Order management
- `GET /admin/products` - Product management

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start backend server
- `npm run preview` - Preview production build

### Database Schema
The application uses MySQL with the following main tables:
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] AI Hairstyle Changer integration
- [ ] User authentication and profiles
- [ ] Social sharing features
- [ ] Mobile app version
- [ ] Advanced search and filtering
- [ ] Style recommendations based on user preferences

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> Stashed changes
