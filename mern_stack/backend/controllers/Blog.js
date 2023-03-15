const Blog= require('../model/blogModel');
const asyncHandler= require('express-async-handler');

//create Blog
exports.createBlog = asyncHandler(async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.json(newBlog);
    } catch (error) {
      throw new Error(error);
    }
});
//update blog 
exports.updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateBlog);
    } catch (error) {
      throw new Error(error);
    }
});
//get blog
exports.getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const getblog = await Blog.findById(id).populate('likes').populate('dislikes');
      console.log(getblog);
      const updateViews = await Blog.findByIdAndUpdate(
        id,
        {$inc: { numViews: 1 }},
        { new: true }
      );
      res.json(getblog);
    } catch (error) {
      throw new Error(error);
    }
});
//get all blogs
exports.getAllBlogs = asyncHandler(async (req, res) => {
    try {
      const getBlogs = await Blog.find();
      res.json(getBlogs);
    } catch (error) {
      throw new Error(error);
    }
});  
//delete blog
exports.deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      res.json(deletedBlog);
    } catch (error) {
      throw new Error(error);
    }
}); 
//like blog
exports.likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    console.log(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    console.log(loginUserId);
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
});
// dislike blog
exports.dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
});

