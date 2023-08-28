import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from './routes/authRoutes.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';

//config env
dotenv.config();

//databse config
connectDB();

//esmodule-file
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')))

// rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//routh
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,() => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});