import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import dotenv from "dotenv"
import { errorResponse, formatAuthError, newError } from './utils.js'

/** Error handler for internal logging */
function errorLogger(error, req, res, next) {
    console.error(error.internalError) //internal logger
    next(errorResponse(error.displayText, error.status))
}

/** Error handler for client response */
function errorResponder(error, req, res, next) {
    res.status(error.status).json(error.json)
}

/** Error handler/filter for Auth0 */
function authErrorFilter(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        err = newError(
            formatAuthError(err.message), 
            "Unauthorized for this resource",
            err.status
        )
    }
    next(err)
}

dotenv.config()

/** Auth0 access tokens validator*/
const checkJwt = jwt.expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://` + process.env.AUTH_DOM + `/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH_ID,
    issuer: `https://` + process.env.AUTH_DOM + `/`,
    algorithms: ['RS256']
});

export {
    errorLogger,
    errorResponder,
    authErrorFilter,
    checkJwt
}