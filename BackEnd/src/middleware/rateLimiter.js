import rateLimit from "../config/upstash.js"

const rateLimitter = async(req,res,next)=>{
    try {
        const {success} = await rateLimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({message:'too many requests, please try again later'})
        }
        next()
    } catch (error) {
        console.log("Rate limit error!");
        next(error)
        
    }
}

export default rateLimitter