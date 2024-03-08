const jwt = require('jsonwebtoken');
const authentication = (req,res,next) =>{
const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

if(!token){
return res.status(401).json({error:'Unauthorized!'})
}

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)    
    req.user = decoded;
    next();
}
catch(err){
console.error('Error veryfying jwt token ',error);
res.status(401).json({error:'Unauthorized'})

}

}