const express= require('express');
const {updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog } = require('../controllers/Blog');
const { upload } = require('../controllers/UploadBlogImage');
const { authMiddleware, isAdmin } = require('../middleWare/authMiddleware');
const blogModel = require('../model/blogModel');
const blogRouter= express.Router();

//add new blog
blogRouter.post('/add',authMiddleware,isAdmin,upload.single('picture'),async(req,res)=>{    
    try {
        const {title,description,category,numViews,isLiked,isDisliked,likes,dislikes,author } = req.body;
        const img = req.file.filename;       
        const newBlog = new blogModel({
            title,
            description,
            category,
            numViews,
            isLiked,
            isDisliked,
            likes,
            dislikes,
            author,
            images :img     
        });
        console.log(img)
        await newBlog.save(); 
        if(!newBlog) return res.status(400).json([{ message: 'blog not created' }]);
        res.json(newBlog);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
});
//like blog
blogRouter.put("/likes",authMiddleware, likeBlog);
//dislike blog
blogRouter.put("/dislikes",authMiddleware, dislikeBlog);
//update blog
blogRouter.put("/update/:id",authMiddleware,isAdmin, updateBlog);
//get blog
blogRouter.get("/:id", getBlog);
//get all blogs
blogRouter.get("/", getAllBlogs);
//delete blog
blogRouter.delete("/delete/:id",authMiddleware,isAdmin, deleteBlog);

module.exports=blogRouter
