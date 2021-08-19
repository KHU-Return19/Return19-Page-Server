const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
const app = express()
const port = 8000

const userRoute = require("./routes/users")
require("dotenv").config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true
}).then(() => console.log("MongoDB Connected ..."))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('dev')
})

// use routes 
app.use("/api/users/", userRoute)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

