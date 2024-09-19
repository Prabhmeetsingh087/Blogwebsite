import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from "../models/user.js";
import PostModel from "../models/Post.js"
import bcrypt from 'bcrypt';    // for security
import Jwt from "jsonwebtoken"; // for security
import multer from "multer";    // for uploading files
import fs from "fs";       // fs is file system

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/uploads', express.static(__dirname + '/uploads'));

const uploadMiddleware = multer({ dest: 'uploads/' }); 

const salt = bcrypt.genSaltSync(10);
const secret = 'starlink893hasinvadedearth894today';


export const updatePostfunc = [
    uploadMiddleware.single('file'), // Use the uploadMiddleware as a middleware
    async (req, res) => {

        let newPath = null;
        if (req.file) {
            const {originalname,path} = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path+'.'+ext;
            fs.renameSync(path, newPath);
        }
        
        const {token} = req.cookies;

        Jwt.verify(token, secret, {}, async (err,info) => {
                
            if (err) throw err;
            
            const {id,title,summary,content} = req.body;
            const postDoc = await PostModel.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            
            if (!isAuthor) {
                return res.status(400).json('you are not the author');
            }

            await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
            });

            res.json(postDoc);
        });
    }
]