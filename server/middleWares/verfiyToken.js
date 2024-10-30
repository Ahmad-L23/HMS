const jwt = require("jsonwebtoken");


exports.verifyToken=(req, res, next)=> {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}


exports.verifyTokenAndDoctor=(req, res, next) => {
    verifyToken(req, res, () => {
      if ((req.user.id === req.params.id && req.user.role==='doctor') || req.user.role==='admin') {
        next();
      } else {
        return res.status(403).json({ message: "you are not allowed" });
      }
    });
  }


  

exports.verifyTokenAndAdmin= (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.role==='admin') {
        next();
      } else {
        return res.status(403).json({ message: "you are not allowed,only admin allowed" });
      }
    });
  }