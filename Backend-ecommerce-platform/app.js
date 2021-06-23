// import all package use in nodejs
const express = require("express")
const mongoose = require("mongoose");
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const bodyParser = require('body-parser')

// inport all routers
const authRouter = require("./routers/authRouter")
const userRouter = require("./routers/userRouter")
const categoryRouter = require("./routers/categoryRouter")
const productRouter = require("./routers/productRouter")
const braintreeRouter = require("./routers/baintreeRouter")
const orderRouter = require("./routers/orderRouter")
const adsRouter = require("./routers/adsRouter")



// config app
const app = express();
require("dotenv").config()
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

// data base connect
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is connected'))
  .catch(err => console.log('not connect to the database'))



app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/braintree', braintreeRouter)
app.use('/api/order', orderRouter)
app.use('/api/adsence', adsRouter)


// run server
const port = process.env.PORT || 3000;
app.listen(port, ()  => {
    console.log(`server is running in port: ${port}`)
})

