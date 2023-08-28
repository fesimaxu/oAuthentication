import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./config/mongodb";
import config from "./config/dbconfig";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import sessionRouter from "./routes/sessionRoutes";
import { error404, error500 } from "./middleware/error";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./utils/swagger";

const { PORT } = config;

const app = express();


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());


const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;
app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_ORIGIN],
  })
);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/session", sessionRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));


app.all('*', error404);
app.use(error500);

const DB_PORT = PORT

// Database connection
connectDB()

app.listen(DB_PORT || '',()=>{
    console.log(`Oauth App is running at http://localhost:${DB_PORT}/`);
    console.log(`Docs available at http://localhost:${DB_PORT}/api-doc`);
})



export default app;