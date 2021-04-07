// import all package use in nodejs
const express = require("express")
const mongoose = require("mongoose");
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require("cors")

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
app.use('/api/ads', adsRouter)


// run server
const port = process.env.PORT || 3000;
app.listen(port, ()  => {
    console.log(`server is running in port: ${port}`)
})

