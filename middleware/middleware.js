const jwt = require('jsonwebtoken');

const checkToken =(req, res, next)=>{
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const actualToken = token.split(' ')[1];

    if (!actualToken) {
      return res.status(403).json({ error: 'Malformed token' });
    }
  next();
};

module.exports = checkToken;
