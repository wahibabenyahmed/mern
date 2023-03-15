const bookSchema= require('../model/BookModel');
const express= require('express');
const {getAllBooks, getOneBook, deleteBook, deleteBooks, updateBook, addToWish, rating }= require('../controllers/Admin');
const {multipleUpload } = require('../controllers/UploadBookCover-pdf');
const bookRouter= express.Router();
const { authMiddleware, isAdmin } = require('../middleWare/authMiddleware');

//add new book
bookRouter.post('/add',authMiddleware,multipleUpload,async(req,res)=>{    
    try {
        const {bookName, bookQuantity, bookAuthor,bookPrice,bookDescription } = req.body;
        const Img = req.files.bookImage[0].filename;
        const Pdf = req.files.bookPdf[0].filename;       
        const newBook = new bookSchema({bookName,bookQuantity,bookAuthor,bookPrice,bookDescription,bookImage:Img,bookPdf:Pdf});
        await newBook.save(); 
        if(!newBook) return res.status(400).json([{ message: 'book not created' }]);
        res.json(newBook);
    } catch (err) {
       console.log(err)
        res.status(500).json({msg:'Server Error'});
    }
})
//get all books
bookRouter.get('/list',getAllBooks)
//get one book by id
bookRouter.get('/list/:id',getOneBook)
//add to wishlist for user
bookRouter.put('/wishlist',authMiddleware,addToWish)
//rate a book for user
bookRouter.put('/rating',authMiddleware,rating)
//delete one book
bookRouter.delete('/delete/:id',authMiddleware,deleteBook)
//delete all books
bookRouter.delete('/delete',authMiddleware,deleteBooks)
//update a book 
bookRouter.put('/update/:id',authMiddleware,multipleUpload,async(req,res)=>{
    try {
        // const {bookName, bookQuantity, bookAuthor,bookPrice,bookDescription } = req.body;
        const Img = req.files.bookImage[0].filename;
        const Pdf = req.files.bookPdf[0].filename;       
        const{id}= req.params;
        
        const updated= await bookSchema.findByIdAndUpdate(id,{bookName:req.body.bookName,bookQuantity:req.body.bookQuantity,bookAuthor:req.body.bookAuthor,bookPrice:req.body.bookPrice,bookDescription:req.body.bookDescription,bookImage:Img,bookPdf:Pdf},{new:true});
         console.log(updated);
         res.status(200).json({message:'the updated book:',updated})
    } catch (err) {
       console.log(err)
        res.status(500).json({msg:'Server Error'});
    }
})


module.exports= bookRouter;
