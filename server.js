import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { startDB } from "./database/mongo.js"
import { errorLogger, errorResponder, authErrorFilter, checkJwt } from './middleware.js'
import routes from './routes/index.js'

/* Express module initialization */
const app = express()

/* Middleware definitions */
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())
app.use(checkJwt)

/* API ENDPOINTS */
app.use('/tasks', routes.tasks)

/* Error-handler middleware definitions */
app.use(authErrorFilter)
app.use(errorLogger)
app.use(errorResponder)

/* Start mongodb client*/
startDB()

/* Server init */
app.listen(3000, () => console.log("Server ready"))

