import * as dotenv from 'dotenv'

dotenv.config()

const configKeys = {
  DB_CONNECTION_STRING : process.env.DB_CONNECTION_STRING,
  PORT : process.env.PORT || 5000,
  
}

export default configKeys;