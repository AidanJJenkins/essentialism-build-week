const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret/index.js");
const secret = require("../secret/index.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json("Need a token!!!")
  }else{
    jwt.verify(token,secret.jwtSecret,(err,decoded)=>{
      if(err){
        res.status(401).json("Token is bad: " + err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
}
