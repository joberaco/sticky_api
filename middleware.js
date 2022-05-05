import { errorResponse } from './utils.js'

/* Error handler for internal logging */
function errorLogger(error, req, res, next) {
    console.error(error.dbError) //internal logger
    next(errorResponse(error.displayText))
}

/* Error handler for client response */
function errorResponder(error, req, res, next) {
    res.status(500).json(error)
}


export {
    errorLogger,
    errorResponder
}