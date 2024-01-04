import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv";
import connectiondb from "./config/Db.js";
import authRouters from './routes/authRoute.js'
dotenv.config();
const app = express();

connectiondb();
// middleware's
app.use(express.json())
app.use(morgan('dev'));
// routers
app.use('/api/v1/auth',authRouters)
// API
app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to ecmmerce app",
    });
})
// create server
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`App running successfully on ${process.env.DEV_NODE}  mode  on ${port} port.`)
})