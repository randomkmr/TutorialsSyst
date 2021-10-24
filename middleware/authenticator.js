const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const isAuthenticated = (req, res, next) => {
  //console.log('Auth testas');
  try {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    console.log('decodedToken', decodedToken);
    req.user = decodedToken;   
    next();
  } catch (error) {
    //console.log('Please login!');
    res.status(401).json({ error });    
    next();
  }
};

const isAuthenticated2 = (req, res, next) => {
  //console.log('Auth testas');
  try {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    console.log('decodedToken', decodedToken);
    req.user = decodedToken;   
    next();
  } catch (error) {
    //console.log('Please login!');
    //res.status(401).json({ error });    
    next();
  }
};

const isAuthenticatedCookie = (req, res, next) => {
  try {
    const token = req.cookies.authtoken;
    const decodedToken = jwt.verify(token, secretKey);
    console.log('decodedToken', decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    //res.status(401).json({ error });
    next();
  }
};

module.exports = isAuthenticated;
module.exports = isAuthenticated2;
module.exports = isAuthenticatedCookie;
