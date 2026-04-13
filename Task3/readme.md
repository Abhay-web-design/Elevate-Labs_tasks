# 📚 Book Management REST API

## 🚀 Project Overview

This project is a simple REST API built using **Node.js** and **Express.js** to manage a list of books. It allows users to perform basic CRUD (Create, Read, Update, Delete) operations without using any database. All data is stored in memory.

This project was developed as part of a **Web Development Internship Task** to understand backend fundamentals like REST APIs, routing, and HTTP methods.

---

## 🎯 Objectives

* Understand REST API architecture
* Learn Express.js routing
* Work with HTTP methods (GET, POST, PUT, DELETE)
* Handle JSON data
* Implement basic error handling

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Postman** (for testing API endpoints)

---

## 📁 Project Structure

```
project-folder/
│
├── index.js        # Main server file
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Abhay-web-design/Elevate-Labs_tasks/tree/main/Task3
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run the server

```
node index.js
```

### 4️⃣ Server will start at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔹 Get All Books

* **Method:** GET
* **Endpoint:** `/books`
* **Description:** Fetch all books

---

### 🔹 Add New Book

* **Method:** POST
* **Endpoint:** `/books`
* **Body (JSON):**

```json
{
  "title": "Book Name",
  "author": "Author Name"
}
```

---

### 🔹 Update Book

* **Method:** PUT
* **Endpoint:** `/books/:id`
* **Body (JSON):**

```json
{
  "title": "Updated Title",
  "author": "Updated Author"
}
```

---

### 🔹 Delete Book

* **Method:** DELETE
* **Endpoint:** `/books/:id`
* **Description:** Delete a book by ID

---

## 🧪 Testing the API

Use **Postman** to test all endpoints:

1. Open Postman
2. Select request type (GET, POST, PUT, DELETE)
3. Enter URL (e.g., `http://localhost:3000/books`)
4. For POST/PUT, add JSON body
5. Click **Send**

---

## 📸 API Screenshots (Postman Responses)

### 🔹 GET /books

![Get all Books](<Screenshot 2026-04-13 122107.png>)

---

### 🔹 POST /books

![Add a new Book](<Screenshot 2026-04-13 122455.png>)

---

### 🔹 PUT /books/:id

![Update a Book](<Screenshot 2026-04-13 122715.png>)

---

### 🔹 DELETE /books/:id

![Delete a Book](<Screenshot 2026-04-13 122737.png>)

---



## ⚠️ Error Handling

The API includes basic error handling:

* **400 Bad Request** → Missing required fields
* **404 Not Found** → Book does not exist
* **500 Internal Server Error** → Server issues

---

## 📌 Features

* In-memory data storage (no database required)
* Full CRUD functionality
* Clean and simple API structure
* JSON-based request and response handling

---

## 🚧 Limitations

* Data is not persistent (resets when server restarts)
* No authentication or authorization
* No frontend/UI

---

## 🔮 Future Improvements

* Integrate MongoDB for persistent storage
* Add authentication (JWT)
* Implement validation using middleware
* Create frontend using React
* Add pagination and search functionality

---

## 🧠 Key Concepts Learned

* REST API design
* Express.js routing
* Middleware usage
* Handling HTTP requests and responses
* JSON parsing

---

## 📤 Submission

After completing the project:

* Push the code to GitHub
* Copy your repository link
* Submit it using the provided form

---

## 👨‍💻 Author

Developed as part of a Web Development Internship Task.
Abhay

---

## ⭐ Acknowledgement

Thanks to the internship program for providing this hands-on learning opportunity to understand backend development fundamentals.
