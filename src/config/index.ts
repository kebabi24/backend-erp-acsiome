/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
   databaseURL: process.env.DB_URI,
  
  //  database: process.env.database,
  //  user: process.env.user,
  //  host: process.env.host,
  //  password: process.env.password,
  // server : "SQLxxx.site4now.net",
  // database : "DB_xxx_xxx",
  // userName : "DB_xxx_xxx_admin",
  // password : "your_password",
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },
};
