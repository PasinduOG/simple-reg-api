# 🚀 Simple Registration API

> A simple REST API for user registration built with Express.js. This API validates user registration data with specific validation for Gmail addresses and Sri Lankan mobile numbers, and stores data in MySQL database.

<div align="start">
  
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mysql&perline=12)](https://skillicons.dev)

</div>

---

## ✨ Features

- 📝 User registration endpoint with validation
- ✉️ Email validation for Gmail addresses
- 📱 Sri Lankan mobile number validation
- 🔐 Password hashing with bcrypt
- 🗃️ MySQL database integration
- 🧩 Transaction handling for data integrity
- 🚫 Duplicate user/email prevention
- ⚙️ Environment variable configuration

## 🔧 Installation

1. 📥 Clone the repository:
```bash
git clone https://github.com/PasinduOG/simple-reg-api.git
cd simple-reg-api
```

2. 📦 Install dependencies:
```bash
npm install
```

3. 🛢️ Set up MySQL database:
   - Create a MySQL database (e.g., `simple_reg_api`)
   - Create a `users` table with the following schema:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) NOT NULL UNIQUE,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(100) NOT NULL,
     mobile VARCHAR(20) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. 🔑 Configure environment variables:
   - Copy `.env.example` to `.env` (if not already present)
   - Update the values in `.env` file with your database credentials:
   ```
   # Database Configuration
   DB_HOST = 'localhost'
   DB_USER = 'your_mysql_username'
   DB_PASSWORD = 'your_mysql_password'
   DB_NAME = 'simple_reg_api'
   DB_PORT = '3306'

   # Server Configuration
   PORT = 5000
   ```

5. 🏃‍♂️ Start the server:
```bash
npm start
```

🔄 For development with auto-restart:
```bash
npm run dev
```

## API Documentation

### Register User

**Endpoint**: `POST /register`

**Request Body**:
```json
{
  "userName": "johndoe",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "secure_password",
  "mobile": "0712345678"
}
```

**Validation Rules**:
- All fields (userName, name, email, password, mobile) are required
- Email must be a valid Gmail address (cannot start with only numbers)
- Mobile number must be a valid Sri Lankan number:
  - Formats accepted: 0712345678, +94712345678, 712345678
  - First digit after 7 must be 0, 1, 2, 4, 5, 6, 7, or 8

**Success Response**:
- Status Code: 201 Created
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "userName": "johndoe",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "mobile": "0712345678"
  }
}
```

**Error Responses**:
- Status Code: 400 Bad Request (Validation Error)
```json
{
  "error": "Please provide name, email and password"
}
```
OR
```json
{
  "error": "Please provide a valid Gmail address"
}
```
OR
```json
{
  "error": "Please provide a valid Sri Lankan mobile number"
}
```

- Status Code: 409 Conflict (Duplicate User)
```json
{
  "error": "Email address is already registered"
}
```
OR
```json
{
  "error": "Username is already taken"
}
```
OR
```json
{
  "error": "Both email and username are already registered"
}
```

- Status Code: 500 Internal Server Error
```json
{
  "error": "Registration failed"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the server | 5000 |
| DB_HOST | Database host address | localhost |
| DB_USER | Database username | root |
| DB_PASSWORD | Database password | |
| DB_NAME | Database name | simple_reg_api |
| DB_PORT | Database port | 3306 |

## Technologies Used

- Node.js
- Express.js
- MySQL
- bcrypt (for password hashing)
- dotenv (for environment variable management)
- mysql2 (MySQL client for Node.js)

<!-- ## Future Improvements

The application has implemented many of the planned features. Future improvements will:

1. Add user authentication and login route
   - JWT based authentication
   - Token expiration and refresh
   - Protected routes
2. Add user profile management
   - Update user information
   - Change password functionality
3. Implement email verification
4. Add password reset functionality
5. Add admin dashboard -->

## Project Structure

```
simple-reg-api/
├── config/
│   └── db.js           # Database configuration
├── models/
│   └── User.js         # User model with database operations
├── .env                # Environment variables (not in repo)
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
├── server.js           # Main application entry point
└── README.md           # Project documentation
```

## License

MIT License - See LICENSE file for details

## Author

Pasindu Madhuwantha

## 🙏 Credits

This README was generated with the assistance of GitHub Copilot, an AI programming assistant that helps create clear and comprehensive documentation.