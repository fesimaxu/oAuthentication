import pool from "../config/postgres";


const createTableQuery = `CREATE TABLE users (
    Id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    email VARCHAR,
    gender VARCHAR,
    password VARCHAR,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
)`


const createTable =async () => {
    try {
        await pool.query(createTableQuery).then(()=>{
            console.log(`user table created successfully`)
        })
    } catch (error) {
            console.log(`error on creating user table`, error)
    }
}


createTable()