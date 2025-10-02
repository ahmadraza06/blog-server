import express from 'express'
import connectDb from './db/db.js';
import dotenv from 'dotenv'
import router from './routes/userRoute.js';
import cors from 'cors'
import bodyParser from 'body-parser';


const app = express();
await connectDb();

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router);

// app.use('/',(req,res)=>{
//     res.send("hello world")
// })

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running successfully at PORT ${PORT}`)
})
