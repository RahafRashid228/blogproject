import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('freedb_blogproject1', 'freedb_rahaf', 'mguXXvqPV8XCg*M', {
    host: 'sql.freedb.tech',
    port:3306,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  export const connectDB= async()=>{
    try{
    return await sequelize.sync({alter: true});

  }catch(error){
    console.log("error to connect DB")
  }

  }

  export default connectDB;