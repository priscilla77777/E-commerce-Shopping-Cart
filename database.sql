DROP DATABASE IF EXISTS ecommerce_cart;
CREATE DATABASE ecommerce_cart;
USE ecommerce_cart;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (name, price, image, description) VALUES
('Strawberry Shortcake', 26.99, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80', 'A soft vanilla sponge layered with fresh strawberries and whipped cream.'),
('Chocolate Dream Cake', 29.50, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', 'A rich chocolate cake topped with silky ganache and chocolate curls.'),
('Matcha Mousse Cake', 27.00, 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80', 'A light and creamy matcha mousse cake with a delicate green tea flavour.'),
('Blueberry Cheesecake', 28.99, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', 'A smooth baked cheesecake finished with sweet blueberry topping.'),
('Pink Velvet Cupcake Set', 18.99, 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80', 'A lovely set of pink velvet cupcakes with cream cheese frosting.'),
('Mango Cream Roll', 21.50, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80', 'A fluffy cake roll filled with fresh mango cream and fruit pieces.');