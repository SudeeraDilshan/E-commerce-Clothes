# E-commerce Clothes (MERN Stack)

An e-commerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The front-end provides a user interface for browsing clothes, cart management, and user login/registration, while the back-end handles API requests for product management, user authentication, and cart updates. An admin panel allows for adding and updating products.

## Features

- **Frontend (React.js)**:
  - Display products
  - Product cart
  - Login and registration pages
  - User-friendly interface

- **Backend (Node.js, Express, MongoDB)**:
  - RESTful API for:
    - Adding products
    - Displaying products
    - Updating products
    - Managing cart items
    - Login/registration functionality
  - Admin panel for product management

## Folder Structure

- `frontend/` : Contains the React.js code for the front-end of the website.
- `backend/` : Contains the Node.js and Express code for the back-end, including the API routes and MongoDB connection.

## Technologies

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js, MongoDB, JWT (for authentication)

## Installation Guide

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Steps to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/E-commerce-Clothes.git
   cd E-commerce-Clothes

2.**Setting up the Frontend**
   cd frontend
   npm install
   npm start

3.**Setting up the Backend**
   cd ../backend
   npm install
   Create a .env file in the backend directory with the following environment variables:
       MONGO_URI=your-mongodb-connection-string
       JWT_SECRET=your-jwt-secret
   npm start

4.**Connecting Frontend and Backend**
      - Ensure that the front-end API calls (e.g., for login, product management) point to 
        http://localhost:5000 during development.
      - Configure proxy in the frontend/package.json by adding
            "proxy": "http://localhost:5000"

 
    



   
