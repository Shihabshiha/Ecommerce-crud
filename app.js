import express, { urlencoded } from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import connectDb from './database/connection.mjs'
import helmet from 'helmet'
import globalErrorHandler from './middleware/errorHandler.mjs'
import AppError from './Utils/appError.mjs'
import { httpStatus } from './config/httpStatus.mjs'
import configKeys from './config/configKeys.mjs'
import router from './routes/index.mjs'


//create express instance
const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

//connect data base
connectDb();

app.use(router)

app.all("*",(req,res,next)=>{
  const err = new AppError(`Can't find ${req.originalUrl} on server`,httpStatus.NOT_FOUND)
  next(err)
})

//Global error
app.use(globalErrorHandler)


//server creation.
const port = configKeys.PORT || 3000;
const server = http.createServer(app);
server.listen(port,()=>{
  console.log(`app listening on port ${port}`)
})