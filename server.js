import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv";
import connectiondb from "./config/Db.js";
import authRouters from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
import path from 'path'
dotenv.config();
const app = express();

connectiondb();
// middleware's
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.json(__dirname,'./client/build')))

// routers
app.use('/api/v1/auth',authRouters)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
// API
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
// create server
const port = process.env.PORT || 8080;  
app.listen(port,()=>{
    console.log(`App running successfully on ${process.env.DEV_NODE}  mode  on ${port} port.`)
})