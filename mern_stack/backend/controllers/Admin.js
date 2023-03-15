const bookSchema= require('../model/BookModel');
const userSchema= require('../model/UserModel');
const asyncHandler= require('express-async-handler');


//add new book
exports.addBook= async(req,res)=>{
    const newBook= new bookSchema(req.body);
    try{
        await newBook.save()
        res.status(200).json({message:'book added to database',newBook})
    }
    catch(error){
        res.status(500).json({message:'cannot add this book'})
    }
}
//get all books
exports.getAllBooks=async(req,res)=>{
    try{
        const bookList=await bookSchema.find();
        res.status(200).json({message:'list of all books',bookList})
    }
    catch{
        res.status(500).json({message:'cannot get the list of books'})
    }
}
//get one book by id
exports.getOneBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const getBook= await bookSchema.findById(id);
        res.status(200).json({message:'book founded by id',getBook})
    }
    catch{
        res.status(500).json({message:'cannot get this book'})
    }
}
//delete one book
exports.deleteBook=async(req,res)=>{
    try{
        const {id}= req.params;
        deleted= await bookSchema.findByIdAndDelete(id);
        res.status(200).json({message:'the deleted book:',deleted})
    }
    catch{
        res.status(500).json({message:'enable to delete this book'})
    }
}
//delete all books
exports.deleteBooks=async(req,res)=>{
    try{
        deletedBooks= await bookSchema.deleteMany();
        res.status(200).json({message:'list of deleted books:',deletedBooks})
    }
    catch{
        res.status(500).json({message:'enable to delete all books'})
    }
}
//update a book 
exports.updateBook=async(req,res)=>{
    try{
        const{id}= req.params;
       const updated= await bookSchema.findByIdAndUpdate(id,{$set:{...req.body}},{new:true});
        console.log(updated);
        res.status(200).json({message:'the updated book:',updated})
    }
    catch{
        res.status(500).json({message:'enable to updated this book'})
    }
};
//add book to wishlist
exports.addToWish = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
      const user = await userSchema.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
      if (alreadyadded) {
        let user = await userSchema.findByIdAndUpdate(
          _id,
          {$pull: { wishlist: prodId}},
          {new: true}
        );
        res.json(user);
      } else {
        let user = await userSchema.findByIdAndUpdate(
          _id,
          {$push: { wishlist: prodId }},
          {new: true}
        );
        res.json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  })
//rate & comment a book
exports.rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await bookSchema.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await bookSchema.updateOne(
        {ratings: { $elemMatch: alreadyRated }},
        {$set: { "ratings.$.star": star, "ratings.$.comment": comment }},
        {new: true}
      );
      // res.json(updateRating)
    } else {
      const rateProduct = await bookSchema.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {new: true}
      );
      res.json(rateProduct)
    }
    
    const getallratings = await bookSchema.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await bookSchema.findByIdAndUpdate(
      prodId,
      {totalrating: actualRating,},
      { new: true }
    );
   return res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});