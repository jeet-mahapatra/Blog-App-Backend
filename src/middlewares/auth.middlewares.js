import { validateToken } from "../utils/auth.utils.js";

function checkForAuthenticationCookie(cookieName){
    return (req,res,next) =>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            return next();
        }

        try {
            const userPayLoad = validateToken(tokenCookieValue)
            
            req.user = userPayLoad
        } catch (error) {
            console.error("Token validation failed:", error);
        }
        return next()
    }

}

export {checkForAuthenticationCookie}