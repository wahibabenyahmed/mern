const mongoose=require('mongoose');

const bookSchema= new mongoose.Schema({
    bookName: String,
    bookQuantity: Number,
    bookAuthor: String,
    bookPrice: Number,
    bookImage: String,
    bookDescription: String,
    bookPdf: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
})

module.exports= mongoose.model('book',bookSchema);