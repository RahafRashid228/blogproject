import {Router} from 'express';
import usermodel from '../../../DB/model/user.model.js';
import blogmodel from '../../../DB/model/blog.model.js';
import commentmodel from '../../../DB/model/comment.model.js';
const app = Router();

app.get('/',async(req,res)=>{
    try{
    const comments= commentmodel.findAll();
    return res.status(200).json({message:"success",comments});

}catch(error){
    return res.status(500).json({message:"ther is an error", error})
}})

app.delete('/:id',async(req,res)=>{ 
const{id}=req.params;
const comment = await commentmodel.destroy({
    where:{
        id:id
    }
})
if(!comment){
    return res.status(404).json({message:"comment not found"})
}
return res.status(200).json({message:"destrroying succeed"});
})

app.put("/:id",async(req,res)=>{
    const {id}= req.params;
    const {descripcomment}=req.body;
   
    const comment =await commentmodel.update(
        {descripcomment:descripcomment},{
            where:{
                id:id
            }
        }
    );
    if(!comment[0]){
        return res.status(404).json({message:"comment not found"})
    }
    return res.status(200).json({message:"add comment succeed"})


    
    })


    app.post('/:id/:userid', async (req,res)=>{
        try{
        const {id}=req.params;
        const{userid}=req.params;
        const{descripcomment}=req.body;
        const blog = await blogmodel.findOne({
            where: {
               id:id},
                attributes:['id']
               
        
        }); 
        // return res.json(id);
        const user = await usermodel.findOne({
            where: {
               id:userid},
            attributes:['id']
               
       
        }); 
        return res.json(userid);
      
        if (!blog){
            return res.status(404).json({message:"blog not found"}) 
        } 
        if (!user){
            return res.status(404).json({message:"user not found"}) 
        } 
        await commentmodel.create({descripcomment,userid:user.id,blogid:blog.id} );
    return res.status(201).json({message:"success"});
}catch(error){
    return res.status(500).json({message:"error",error})

}})
         ;
export default app;