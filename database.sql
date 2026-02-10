-- Create database
CREATE DATABASE IF NOT EXISTS lifestyle_shop;
USE lifestyle_shop;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  image VARCHAR(500),
  description TEXT,
  vegan BOOLEAN DEFAULT FALSE,
  organic BOOLEAN DEFAULT FALSE,
  ingredients TEXT,
  sustainability_score INT DEFAULT 0
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  name VARCHAR(255),
  price DECIMAL(10,2),
  qty INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Styles table
CREATE TABLE IF NOT EXISTS styles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  color_palette JSON,
  outfit_ideas JSON,
  book_recommendations JSON,
  recipe_pairings JSON,
  mood VARCHAR(100),
  season VARCHAR(50)
);

-- Insert sample products
INSERT INTO products (name, category, price, stock, image, description, vegan, organic, ingredients, sustainability_score) VALUES
('Organic Coconut Oil Shampoo', 'Personal Care', 12.99, 50, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Natural shampoo made with organic coconut oil for healthy, shiny hair. Free from sulfates and parabens.', TRUE, TRUE, 'Organic Coconut Oil, Aloe Vera, Essential Oils', 9),
('Vegan Protein Powder', 'Nutrition', 29.99, 30, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Plant-based protein powder from pea and hemp. Supports muscle recovery and overall health.', TRUE, FALSE, 'Pea Protein, Hemp Protein, Natural Flavors', 8),
('Eco-Friendly Bamboo Utensils', 'Home', 4.99, 100, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Eco-friendly bamboo utensils set including fork, spoon, and chopsticks. Sustainable and biodegradable.', TRUE, TRUE, 'Bamboo', 10),
('Organic Quinoa Salad Kit', 'Food', 15.99, 40, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Ready-to-eat organic quinoa salad with fresh vegetables and herbs. Nutrient-rich and delicious.', TRUE, TRUE, 'Organic Quinoa, Mixed Greens, Cherry Tomatoes, Cucumber, Olive Oil Dressing', 9),
('Natural Beeswax Lip Balm', 'Personal Care', 6.99, 60, 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Moisturizing lip balm made with pure beeswax and essential oils. Protects and nourishes lips.', FALSE, TRUE, 'Beeswax, Coconut Oil, Essential Oils', 7),
('Sustainable Yoga Mat', 'Fitness', 39.99, 25, 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Eco-friendly yoga mat made from natural rubber and cork. Non-slip and supportive.', TRUE, TRUE, 'Natural Rubber, Cork', 9),
('HealthWise Organic Ground Coffee', 'Beverages', 9.99, 80, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Premium organic ground coffee beans for a rich, smooth brew. Fair trade and sustainably sourced.', TRUE, TRUE, 'Organic Coffee Beans', 8),
('Cruelty-Free & Vegan Sunscreen', 'Personal Care', 15.99, 70, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Cruelty-free and vegan sunscreen with natural ingredients. Broad spectrum protection without harmful chemicals.', TRUE, TRUE, 'Zinc Oxide, Coconut Oil, Natural Oils', 9),
('Natural Essential Oil Diffuser', 'Home', 34.99, 20, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', 'Ultrasonic diffuser for essential oils. Creates a calming atmosphere with natural scents.', TRUE, FALSE, 'Plastic-Free Materials, Essential Oil Compatible', 7);

-- Insert sample styles
INSERT INTO styles (name, description, image, color_palette, outfit_ideas, book_recommendations, recipe_pairings, mood, season) VALUES
('Cottagecore', 'Cottagecore is a lifestyle and aesthetic centered around rural, agrarian life. It emphasizes simplicity, self-sufficiency, and a connection to nature. Think floral dresses, gardening, baking, and cozy evenings by the fireplace.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#8B7355", "#D4A574", "#F5F5DC", "#228B22", "#8FBC8F"]', '["Floral sundresses with lace details", "Denim overalls and work boots", "Linen button-up shirts", "Wide-brimmed sun hats", "Canvas aprons for gardening"]', '["The Secret Garden by Frances Hodgson Burnett", "Anne of Green Gables by L.M. Montgomery", "The Cottage Tales of Beatrix Potter", "Walden by Henry David Thoreau", "The Herbal Medicine-Maker''s Handbook by James A. Duke"]', '["Fresh berry scones with clotted cream", "Herbal teas and wildflower honey", "Homemade vegetable soup with garden herbs", "Apple cider vinegar salad dressing", "Fresh bread with butter and jam"]', 'Peaceful, nostalgic, grounded', 'Spring/Summer'),
('Minimalist', 'Minimalism focuses on living with less. It''s about intentionality, quality over quantity, and creating space for what truly matters. Clean lines, neutral colors, and functional design define this aesthetic.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#FFFFFF", "#F5F5F5", "#000000", "#808080", "#C0C0C0"]', '["Monochrome capsule wardrobe", "Tailored blazers and trousers", "White button-down shirts", "Clean sneakers or loafers", "Timeless trench coats"]', '["The Life-Changing Magic of Tidying Up by Marie Kondo", "Less Is More by Jason Hickel", "The Minimalist Home by Joshua Becker", "Goodbye, Things by Fumio Sasaki", "Essentialism by Greg McKeown"]', '["Simple green salads with olive oil", "Oatmeal with fresh fruit", "Grilled chicken with steamed vegetables", "Smoothies with minimal ingredients", "Herbal tea with lemon"]', 'Calm, focused, intentional', 'Year-round'),
('Dark Academia', 'Dark Academia draws inspiration from classic literature, Gothic architecture, and intellectual pursuits. It combines scholarly aesthetics with moody, atmospheric elements. Think tweed jackets, vintage books, and candlelit study sessions.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#2F1B14", "#8B4513", "#DAA520", "#800080", "#4B0082"]', '["Tweed blazers and waistcoats", "Oxford shirts and chinos", "Cable knit sweaters", "Leather brogues", "Academic robes and scarves"]', '["Ninth House by Leigh Bardugo", "Bunny by Mona Awad", "The Maidens by Alex Michaelides", "Catherine House by Elisabeth Thomas", "The Atlas Six by Olivie Blake"]', '["Earl Grey tea with scones", "Dark chocolate and red wine", "Roasted root vegetables", "Herb-crusted lamb", "Mulled wine and cheese platters"]', 'Intellectual, mysterious, elegant', 'Fall/Winter'),
('Streetwear', 'Streetwear originated from skate and hip-hop culture, evolving into a global fashion movement. It celebrates urban style, bold graphics, oversized silhouettes, and street art influences. Comfort meets edge in this dynamic aesthetic.', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#FF0000", "#000000", "#FFFFFF", "#FFD700", "#FF4500"]', '["Oversized hoodies and cargo pants", "Graphic tees and sneakers", "Bucket hats and beanies", "Layered chains and jewelry", "Bomber jackets with patches"]', '["The Art of Streetwear by Emma McClendon", "Streetwear: The Insider''s Guide by Alex Badia", "Can''t Stop Won''t Stop by Jeff Chang", "Style Like U by Chloe Hilliard", "Fresh Prince by Carlton Howard"]', '["Street tacos with bold spices", "Energy drinks and protein bars", "Bubble tea and boba", "Korean fried chicken", "Ramen bowls with extra toppings"]', 'Energetic, confident, urban', 'Year-round'),
('Cozy Winter', 'Cozy Winter embraces the comfort and warmth of the colder months. It''s all about soft textures, warm beverages, and creating a sanctuary from the chill. Think fuzzy blankets, hot cocoa, and the joy of staying in.', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#8B4513", "#DC143C", "#FF6347", "#F5DEB3", "#2F4F4F"]', '["Chunky knit sweaters and scarves", "Thermal leggings and boots", "Fleece-lined jackets", "Wool socks and slippers", "Turtlenecks and cardigans"]', '["The Winter People by Jennifer McMahon", "Winter by Marissa Meyer", "The Bear and the Nightingale by Katherine Arden", "The Snow Child by Eowyn Ivey", "Winter''s Orbit by Everina Maxwell"]', '["Hot chocolate with marshmallows", "Spiced apple cider", "Creamy soups and stews", "Gingerbread cookies", "Mulled wine and hot toddies"]', 'Warm, comforting, introspective', 'Winter'),
('Sneakers Take Center Stage', 'Sneakers Take Center Stage celebrates the sneaker as the ultimate fashion statement. From vintage collectibles to limited-edition drops, this aesthetic is all about the perfect pair of kicks that elevate any outfit. It''s about the culture, the community, and the endless possibilities of sneaker styling.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360&q=80', '["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#1E3A8A"]', '["Premium sneakers with tailored suits", "Athleisure sets with statement sneakers", "Streetwear looks with vintage finds", "Casual jeans and sneakers combos", "Sneaker matching sets and accessories"]', '["Sneaker Wars by Barbara Smit", "The Sneaker Book by Tom Vanderbilt", "Kicks by Nicholas Smith", "Sneakers: The Complete Collectors Guide by Unorthodox Styles", "The Art of Sneaking by Ali Edwards"]', '["Craft beer and pretzels", "Loaded nachos and energy drinks", "Street-style tacos", "Bubble tea and boba", "Protein smoothies and granola bars"]', 'Energetic, trendy, expressive', 'Year-round');