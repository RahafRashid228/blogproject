import {Router} from 'express';
import usermodel from '../../../DB/model/user.model.js';
//import jwt from 'jsonwebtoken';
import blogmodel from '../../../DB/model/blog.model.js';
const app = Router();

app.get('/',async(req,res)=>{
    try{
    const blogs= blogmodel.findAll();
    return res.status(200).json({message:"success",blogs});

}catch(error){
    return res.status(500).json({message:"ther is an error", error})
}})

app.post('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const user = await usermodel.findOne({
            where: { id: id },
            attributes: ['id','rool'] 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.rool !== 'admin') {
            return res.status(400).json({ message: "User not authorized to add blog" });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        await blogmodel.create({ title, description,userid:user.id });

        return res.status(201).json({ message: "Blog added successfully" });
    } catch (error) {
        return res.status(400).json({ message: "An error occurred while adding the blog" });
    }


});

app.delete('/:id',async(req,res)=>{
    //return res.json(req.headers)
    const {id }=req.params;
    const {title} = req.body;
    try{
    const user= await usermodel.findOne({
        where: {id:id},
        attributes:['id','rool']

    });
   
if(!user){
    return res.status(404).json({message:"user not found"})
}
if(user.rool!='admin'){
    return res.status(404).json({message:"unauthorized operation"});   
}
const blog = await blogmodel .findOne({
    where:{title:title}
});
if(!blog){
    return res.status(400).json({message:"no blog found"});
}
await blog.destroy();
return res.status(200).json({message:"destrroying succeed"});
}catch(error){
    return res.status(404).json({message:"error occured",error})
}});

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
  
        const user = await usermodel.findOne({
            where: { id:id },
            attributes: ['id', 'rool']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.rool !== 'admin') {
            return res.status(400).json({ message: "unautheurized operation" });
        }

        
        const blog = await blogmodel.findOne({
            where: { title: title },
            attributes: ['id']

        });

        if (!blog) {
            return res.status(404).json({ message: "no blog found" });
        }

        
        await blogmodel.update(
            { description: description },
            {
                where: {
                    id: blog.id     
                }
            }
        );

        return res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: "An error occurred while updating the blog" });
    }
});



    

export default app;