/** Generic response for successful transaction */
const okResponse = {ok: "success"}

/** Custom json error for api responses */
function errorResponse(msg) {
    return {error: msg}
}

/** Custom DB throw error for middleware next()
 * @param {string} err detailed error string from mongo for internal loggers
 * @param {string} text custom error string for api responses (external)
*/
function newDbError(err, text) {
    return {dbError: err, displayText: text}
}

export {
    okResponse,
    errorResponse,
    newDbError
}