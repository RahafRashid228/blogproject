import  express from 'express'
import { initApp } from './src/initApp.js'

import userRouter from './src/module/user/user.router.js';
const app=express()
const port=3000

initApp(app,express);



app.listen(port,()=> console.log(`example app is listening on port ${port}!`))