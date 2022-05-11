/** Generic response for successful transaction */
const okResponse = {ok: "success"}

/** Custom json error + status for api responses */
function errorResponse(msg, status) {
    return {json: {error: msg}, status: status}
}

/** Custom throw error for middleware next()
 * @param {string} err detailed error string for internal loggers
 * @param {string} text custom error string for api responses (external)
 * @param {string} status error status (default: 500)
*/
function newError(err, text, status = 500) {
    return {internalError: err, displayText: text, status: status}
}

function formatMongoError(err) {
    return "[MongoDB]: " + err;
}

function formatAuthError(err) {
    return "[Auth]: " + err;
}

export {
    okResponse,
    errorResponse,
    newError,
    formatMongoError,
    formatAuthError
}