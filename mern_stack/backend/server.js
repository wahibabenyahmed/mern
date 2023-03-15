const express=require('express');
const ConnectDb = require('./config/ConnexionDb')
const bookRouter= require('./routes/BookRoutes');
const userRouter= require('./routes/UserRoutes');
const blogRouter = require('./routes/blogRoutes');
const cookieParser=require('cookie-parser');
const app=express();
const port=5008;
const morgan= require('morgan');
const cors= require('cors');
const couponRouter = require('./routes/couponRoutes');
app.use( '/Public',express.static('Public'));
app.use(express.json({extended: false}))
ConnectDb();
app.use(cookieParser());
app.use(morgan())
app.use(cors( { origin:"http://localhost:3000",credentials:true}
));
app.use('/admin',bookRouter);
app.use('/users',userRouter)
app.use('/blogs',blogRouter)
app.use('/coupons',couponRouter)


app.listen(port,(err)=>{
    err?
    console.err('err')
    :
    console.log(`server is running in port : ${port}`);
})