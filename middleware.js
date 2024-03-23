const {JWT_SECRET} = require('./config');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorisation;
   
    if(!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(403).json({
           msg: "access denide"
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId;
            next()

        }
        
    } catch (error) {
        
        return res.status(403).json({msg:'invalid token1'})
    }

}
module.exports = {authMiddleware}