import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginFunc, registerFunc, postFunc } from './controller/create.js';
import { getPostsFunc, openPostfunc } from './controller/read.js'; 
import { updatePostfunc } from './controller/update.js';
import cookieParser from 'cookie-parser';
import Jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;
const secret = 'starlink893hasinvadedearth894today';

dotenv.config();
app.use( cors({credentials:true, origin:'http://localhost:3000'}) );
app.use( express.json() );
app.use( cookieParser() );

mongoose.connect(process.env.MONGO_URI);

// requests coming from these routes will go to specified functions
app.post( '/register', registerFunc);
app.post( '/login', loginFunc)


// JWT VERFICATION req. send from Header.js
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    Jwt.verify( token, secret, {}, (err, info) => {
        if( err ) throw err;
        res.json(info);
    });
});


// LOGOUT function called from Header.js
app.post('/logout', (req,res) => {
    res.cookie('token', '').json('logout ok 👍');
})


// Creating a post
app.post('/post', postFunc);


// Displaying the post on the home screen
app.get('/post', getPostsFunc);
// Displaying a single post (on which the user clicks)
app.get('/post/:id', openPostfunc)


app.put('/post', updatePostfunc);

app.listen(PORT, () => { 
    console.log(`server is running successfully on PORT ${PORT}` )
});