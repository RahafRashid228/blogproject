import connectDB from '../DB/connection.js';
import userRouter from'./module/user/user.router.js';
import authRouter from './module/auth/auth.router.js';
import blogRouter from './module/blog/blog.router.js';
import commentRouter from './module/comment/comment.router.js';
import cors from 'cors';

export const initApp = (app,express) =>{
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use('/users',userRouter);
    app.use('/auth',authRouter);
    app.use('/blogs',blogRouter);
    app.use('/comments',commentRouter);
    
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    })
};