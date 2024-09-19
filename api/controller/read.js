import PostModel from "../models/Post.js"

export const getPostsFunc = async (req, res) => {
    // res.json(await PostModel.find().populate('author', ['username'])); 
    res.json(
        await PostModel.find()
          .populate('author', ['username'])
          .sort({createdAt: -1})
          .limit(20)
    );
}

export const openPostfunc = async (req, res) => {
    const {id} = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
}

