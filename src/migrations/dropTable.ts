import pool from "../config/postgres";


const dropTableQuery = `DROP TABLE users`




const dropTable =async () => {
    try {
        await pool.query(dropTableQuery).then(()=>{
            console.log(`user table drop successfully`)
        })
    } catch (error) {
            console.log(`error on dropping user table`, error)
    }
}

dropTable()