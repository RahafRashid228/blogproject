import {Router} from 'express';
import usermodel from '../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';
import { json } from 'sequelize';
import jwt from 'jsonwebtoken';
const app = Router();





app.post('/', async (req,res)=>{

    const{name,email,password}=req.body;
    var passwordHashed = bcrypt.hashSync(password,8);
   // return res.json({name,email,password});
    await usermodel.create({name, email,password:passwordHashed} );
    return res.status(201).json({message:"success"});
})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    
    const user = await usermodel.findOne({
        where: {
            email:email,
           
    }
    }); 

if (!user){
    return res.status(404).json({message:"email not found"})  
}
const check=await bcrypt.compare(password,user.password);
if(!check){
    return res.status(400).json({message:"invalid password"}) 
    
}

const token =await jwt.sign({id:user.id, username:user.name},"secret")
    return res.status(200).json({message:"success",token});
});


export default app;