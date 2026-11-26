
const express =require('express')

const cors =require('cors')
const connectDB = require('./config/db')

const orderRoutes = require('./routes/orderRoutes')


require('dotenv').config()


const app =express()


//middlewares

app.use(cors())
app.use(express.json())


app.use('/api/orders',orderRoutes)



//test route

app.get('/',(req,res)=>{

    res.send("E-commerce API is running")
})


//server

const PORT =process.env.PORT || 3000

const startServer =async()=>{


    try{


        await connectDB()
        app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);
    
})



    }
    catch(err){

        console.error("Failed to start server:", err);
        process.exit(1)
        


    }
}

startServer()
