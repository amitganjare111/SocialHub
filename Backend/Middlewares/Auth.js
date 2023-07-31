const User = require('../models/User');
const jwt = require("jsonwebtoken");
//const jwt_decoder = require('jwt-decode'); 

exports.isAuthenticated = async (req, res, next) => {

    try{
    const {token} = req.cookies;
    
    //console.log("token "+token);
    
    if(!token){
        return res.status(401).json({ message:"please login first"});
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //var decoded = jwt_decoder(token, process.env.JWT_SECRET);

    // console.log("decod "+decoded._id)
    
    req.user = await User.findById(decoded._id);

    // console.log("ddd "+req.user._id);
    next();

    }catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
};