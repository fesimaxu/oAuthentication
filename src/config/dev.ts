import dotenv from "dotenv";

dotenv.config()

const {DEV_PORT, DB_NAME} = process.env

export default{
    PORT:DEV_PORT,
    DB_NAME: DB_NAME
}

console.log("running in development mode")