const mysql = require('mysql2/promise');
const {mysqlConfig, secretKey} = require('../../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (email, password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    console.log(email, password);
    console.log(salt, hashedPassword);
  
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
      `
      INSERT INTO users(email, password)
      VALUES(?, ?)
    `,
      [email, hashedPassword],
    );
    await con.end();
    return result;
  };

// Login User
exports.loginUser = async (email, password) => {
    console.log('Trying to Login..');
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `,
        [email]
    );
    await con.end();
    console.log(result);
    const isLoggedIn = bcrypt.compareSync(password, result[0].password);
    console.log('Login: ', isLoggedIn);

    if (!isLoggedIn) {
        return 'Login error';
    }

    const token = jwt.sign(
        {
            email: result[0].email,
        },
        secretKey,
    );
    console.log(token);
    return token;
}

// Count Users
exports.countUsers = async () => { 
    const con = await mysql.createConnection(mysqlConfig); 
    const [result] = await con.execute(
        `
        SELECT COUNT(email)
        FROM users  
        WHERE email IS NOT NULL      
        `    
    );
    await con.end();
    resultCount = Object.values(result[0])[0]; 
    return resultCount
}

//module.exports = registerUser;