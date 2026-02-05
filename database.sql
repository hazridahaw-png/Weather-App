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