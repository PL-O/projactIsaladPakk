const express = require('express');
const userRouter = require('./routes/user.router');
const resRouter = require('./routes/restaurant.router');
const cors = require('cors')


//Create Server
const app = express();

//Use Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Router
app.get('/',(req,res)=>{
    res.send('<h1>This is User API</h1>'); //โชว์ข้อมูลที่กำหนด

});


// เรียกใช้ router
app.use("/apis",userRouter)
app.use("/apis",resRouter)





//Run server
app.listen(5000, ()=>{
    console.log('Server listening to port 5000')
})
