const expressJwt = require('express-jwt')

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})

exports.isValidRefreshToken = expressJwt({
    secret: process.env.REFRESHSECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})