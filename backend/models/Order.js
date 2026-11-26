const mongoose =require('mongoose')

const orderSchema =new mongoose.Schema({

    orderNumber:{
        type:String,
        required:true,
        unique:true
    },
    customer:{
        firstName:{
            type:String,
            required:true
        },
         lastName: {
       type:String,
       required:true
    },
    email: {
        type:String,
        required:true,
    },
    phone: {
       type:String,
       required:true
    }

    },
    products:{
        type:Array,
        required:true
    },
    subTotal:{
        type:Number,
        required:true
    },
     shipping:{
        type:Number,
        required:true
    },
     total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"confirmed"
    }
   
}, {timestamps:true})


module.exports =mongoose.model("Order",orderSchema)