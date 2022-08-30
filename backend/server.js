const express=require('express')
const app=express()
const notes=require("./data/notes")
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config();
const mongoose = require("mongoose");
const connectDB=require('./config/db')
const userRoutes=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const bodtPearser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");

connectDB();
app.use(express.json());

//body-parser middleware
app.use(bodtPearser.urlencoded({ extended: false }));
app.use(bodtPearser.json());
app.use(cors())

//DB config
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT||4000;

app.listen(PORT,console.log(`server is Running on port ${PORT}`))