import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))


import clientRouter from './routes/client.routes.js'

app.use('/api/v1/client',clientRouter)

export {app};