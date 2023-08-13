import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv"

dotenv.config()

const app = express();


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());



app.listen(process.env.PORT,()=>{
    console.log(`Oauth App is running at http://localhost:${process.env.PORT}`)
})



export default app;