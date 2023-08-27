import pg from "pg";
import dotenv from "dotenv";
//or native libpq bindings
//var pg = require('pg').native
dotenv.config()

const conString = `${process.env.PG_CONNECTING_STRING}` //Can be found in the Details page
const client = new pg.Client(conString);

export const connectPgDB = async () => {
    client.connect(async function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
          await client.query('SELECT NOW() AS "theTime"', async function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log(`PG Cloud Database is connected at time: ${result.rows[0].theTime}`);
          // >> output: 2018-08-23T14:02:57.117Z
        const {rows} =  await client.query('DROP TABLE Vendor')
        console.table(rows)
          await client.end();
        });
      });
}



