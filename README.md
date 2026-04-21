# 📚 Bookstore POS — Full Stack Management System

A full-stack Point of Sale and Inventory Management System for bookstores, built with Spring Boot, React, and MySQL.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 4.0, Java 20 |
| Frontend | React 18, Vite 8.0 |
| Database | MySQL 8.0.45 |
| ORM | Spring Data JPA / Hibernate |
| HTTP Client | Axios |
| Routing | React Router v6 |
| Build Tool | Maven |

---

## ✨ Features

- 📖 **Book Catalog** — Full CRUD for books with ISBN, author, publisher, genre, price and stock
- 🔍 **Search** — Search books by title, author, or ISBN
- 🛒 **Cart** — Add books to cart with quantity management
- 🧾 **Invoice & GST** — Automatic GST (18%) calculation with itemized invoice
- 👤 **User Auth** — Register and login with session management
- 💾 **Order Persistence** — Complete order and order item records saved to MySQL

---

## 📁 Project Structure

```
bookstore-pos/
├── Backend/                        # Spring Boot backend
│   └── src/main/java/com/ecommerce/backend/
│       ├── controller/             # REST API controllers
│       │   ├── BookController.java
│       │   ├── CategoryController.java
│       │   ├── OrderController.java
│       │   └── UserController.java
│       ├── model/                  # JPA entity classes
│       │   ├── Book.java
│       │   ├── Category.java
│       │   ├── Order.java
│       │   ├── OrderItem.java
│       │   └── User.java
│       ├── repository/             # JPA repositories
│       ├── service/                # Business logic
│       └── BackendApplication.java
│
└── frontend/                       # React frontend
    └── src/
        ├── components/
        │   └── Navbar.jsx
        └── pages/
            ├── Books.jsx
            ├── Cart.jsx
            ├── Checkout.jsx
            ├── Home.jsx
            ├── Login.jsx
            └── Register.jsx
```

---

## 🗄️ Database Schema

```sql
category    — id, name
user        — id, name, email, password, role
book        — id, title, author, isbn, publisher, genre, price, stock, category_id
orders      — id, user_id, status, total, gst, created_at
order_item  — id, order_id, book_id, quantity, price
```

---

## 🚀 Getting Started

### Prerequisites

- Java 20+
- Node.js 18+
- MySQL 8.0+
- Maven

---

### 1. Database Setup

Open MySQL Workbench or MySQL CLI and run:

```sql
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER'
);

CREATE TABLE book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) UNIQUE NOT NULL,
    publisher VARCHAR(255),
    genre VARCHAR(100),
    price DOUBLE NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    total DOUBLE NOT NULL DEFAULT 0.0,
    gst DOUBLE NOT NULL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);

INSERT INTO category (name) VALUES ('Fiction'), ('Technology'), ('Self Help'), ('Fantasy');

INSERT INTO book (title, author, isbn, publisher, genre, price, stock, category_id) VALUES
('The Alchemist', 'Paulo Coelho', '978-0062315007', 'HarperOne', 'Fiction', 12.99, 50, 1),
('Clean Code', 'Robert C. Martin', '978-0132350884', 'Prentice Hall', 'Technology', 35.99, 30, 2),
('Atomic Habits', 'James Clear', '978-0735211292', 'Avery', 'Self Help', 16.99, 45, 3),
('Harry Potter', 'J.K. Rowling', '978-0439708180', 'Scholastic', 'Fantasy', 14.99, 60, 4);
```

---

### 2. Backend Setup

```bash
cd Backend
```

Open `src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

Run the backend:

```bash
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔗 API Endpoints

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| GET | `/api/books/search/title?title=` | Search by title |
| GET | `/api/books/search/author?author=` | Search by author |
| GET | `/api/books/search/isbn?isbn=` | Search by ISBN |
| POST | `/api/books` | Add new book |
| PUT | `/api/books/{id}` | Update book |
| DELETE | `/api/books/{id}` | Delete book |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/user/{userId}` | Get orders by user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Register user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |

---

## 📌 Future Improvements

- [ ] JWT Authentication with role-based access
- [ ] Admin panel for book management
- [ ] Order history page
- [ ] PDF invoice export
- [ ] Low stock alerts
- [ ] Dashboard analytics

---

