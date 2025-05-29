const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).send({ error: err.message });
    }
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({ error: 'Invalid token' });
    }
    
    res.status(500).send({ error: 'Something went wrong' });
  };
  
  module.exports = errorHandler;