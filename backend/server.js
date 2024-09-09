const express = require("express")
const userRouter = require("./routes/user.routes")
const todoRouter = require("./routes/todo.routes")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', todoRouter)



app.listen(process.env.PORT || 8000,()=>{
    console.log('started server')
})