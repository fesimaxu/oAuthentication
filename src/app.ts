import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/mongodb";

dotenv.config()

const app = express();


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

const PORT = process.env.DEV_PORT || process.env.PROD_PORT

// Database connection
connectDB()

app.listen(PORT || '',()=>{
    console.log(`Oauth App is running at http://localhost:${PORT}`)
})



export default app;