import { DataTypes } from'sequelize';
import {sequelize} from './../connection.js';
import usermodel from './user.model.js';
import blogmodel from './blog.model.js';

const commentmodel=sequelize.define('Comment',{
   
    descripcomment:{
        type:DataTypes.STRING,
        allowNull:true
    }
});
commentmodel.belongsTo(usermodel);
usermodel.hasMany(commentmodel);
commentmodel.belongsTo(blogmodel);
blogmodel.hasMany(commentmodel);
export default commentmodel;