import JWT from "jsonwebtoken"

const secret = "jhinkusuperman@1234567"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImage,
        role: user.role
    }
    const token = JWT.sign(payload,secret)
    return token
}

function validateToken(token){
    const payload = JWT.verify(token, secret)
    return payload
}


export {createTokenForUser,
    validateToken
}