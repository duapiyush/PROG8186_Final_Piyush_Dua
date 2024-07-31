# Car After-Market Parts E-commerce Website

- Student name: Piyush Dua
- Student Number: 8980841
- Date: 28-07-2024

This project is an e-commerce website for car after-market parts, built using the Model-View-Controller (MVC) architectural pattern. The website allows users to browse products by category, view product details, add items to their cart, and place orders. Administrators have the ability to manage product categories, products, and orders.

## Technology Stack

### Frontend
- React.js
- React Context API (for state management)

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite database
- Express Session (for user authentication)


## Features

### User Features
- User registration and login
- Browse products by category
- View product details
- Add products to cart
- Place orders
- View order history

### Admin Features
- Admin login
- Add, edit, and delete product categories
- Add, edit, and delete products
- View and manage orders


## Entities

The main entities in the system are:

- User
- Product
- Category
- Order
- OrderItem

## Entity Attributes

### User
- id (primary key)
- username
- email
- password
- createdAt
- updatedAt

### Product
- id (primary key)
- name
- description
- price
- categoryId (foreign key referencing Category table)
- imageUrl
- createdAt
- updatedAt

### Category
- id (primary key)
- name
- createdAt
- updatedAt

### Order
- id (primary key)
- userId (foreign key referencing User table)
- total
- status
- createdAt
- updatedAt

### OrderItem
- id (primary key)
- orderId (foreign key referencing Order table)
- productId (foreign key referencing Product table)
- quantity
- price
- createdAt
- updatedAt
