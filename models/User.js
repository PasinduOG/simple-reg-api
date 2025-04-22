const pool = require('../config/db');

class User {
    // Example transaction in User model
    static async createWithTransaction(user) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Check if user already exists
            const [existingUsers] = await connection.query(
                'SELECT * FROM users WHERE email = ? OR username = ?',
                [user.email, user.userName]
            );

            if (existingUsers.length > 0) {
                // Check if email exists
                const emailExists = existingUsers.some(user => user.email === user.email);
                // Check if username exists
                const usernameExists = existingUsers.some(user => user.username === user.userName);

                // Create a custom error with specific code
                const error = new Error();
                error.code = 'USER_EXISTS';

                if (emailExists && usernameExists) {
                    error.message = 'Both email and username are already registered';
                } else if (emailExists) {
                    error.message = 'Email address is already registered';
                } else {
                    error.message = 'Username is already taken';
                }

                throw error;
            }

            // Multiple database operations
            const [result] = await connection.query(
                'INSERT INTO users (username, name, email, password, mobile) VALUES (?, ?, ?, ?, ?)',
                [user.userName, user.name, user.email, user.password, user.mobile]
            );

            // Add more operations as needed
            await connection.commit();
            return result.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = User;