import express, { response } from 'express';
import { PORT, MONGODBURI } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['content-type']
}));
app.use('/books',booksRoute);

app.get('/',(req,res)=>{
res.status(200).send({message:"Welcome"});
});





mongoose
    .connect(MONGODBURI)
    .then(()=>{
        console.log("Successfully connceted to database");
        app.listen(PORT,()=>{
            console.log(`Listening to PORT ${PORT}`);
        })

    })
    .catch((error)=> {console.log(error.message)});



