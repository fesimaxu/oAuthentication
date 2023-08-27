import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./config/mongodb";
import config from "./config/dbconfig";



const { PORT } = config;

const app = express();


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

const DB_PORT = PORT

// Database connection
connectDB()

app.listen(DB_PORT || '',()=>{
    console.log(`Oauth App is running at http://localhost:${DB_PORT}`)
})



export default app;