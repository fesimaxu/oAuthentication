import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config()
 
const pool = new Pool({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  database: `${process.env.DATABASE}`,
  password: `${process.env.PASSWORD}`,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})



export default pool;