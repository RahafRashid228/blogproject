import { DataTypes } from'sequelize';
import {sequelize} from './../connection.js';
import usermodel from './user.model.js';
const blogmodel=sequelize.define('Blog',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
       
    }
});
blogmodel.belongsTo(usermodel);
usermodel.hasMany(blogmodel);
export default blogmodel;