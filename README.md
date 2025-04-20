# 🚀 Simple Registration API

> A simple REST API for user registration built with Express.js. This API validates and processes user registration data with specific validation for Gmail addresses and Sri Lankan mobile numbers.

<div align="start">
  
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mysql&perline=12)](https://skillicons.dev)

</div>

---

## ✨ Features

- 📝 User registration endpoint with validation
- ✉️ Email validation for Gmail addresses
- 📱 Sri Lankan mobile number validation
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

3. 🔑 Configure environment variables:
   - Copy `.env.example` to `.env` (if not already present)
   - Update the values in `.env` file as needed

4. 🏃‍♂️ Start the server:
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
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "secure_password",
  "mobile": "0712345678"
}
```

**Validation Rules**:
- All fields (name, email, password, mobile) are required
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
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "mobile": "0712345678"
  }
}
```

**Error Responses**:
- Status Code: 400 Bad Request
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

## Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the server | 3000 |

## Technologies Used

- Node.js
- Express.js
- dotenv (for environment variable management)

## Future Improvements

The application is set up for database integration but currently only validates user input. Future improvements will:

1. Implement MySQL database integration to store user data
   - Create user table with appropriate columns for name, email, password, mobile
   - Set up connection pooling for optimal performance
   - Implement database transaction handling
2. Add password hashing using bcrypt
3. Check for existing email addresses to prevent duplicates
4. Add user authentication and session management

## License

MIT License - See LICENSE file for details

## Author

Pasindu Madhuwantha
````
