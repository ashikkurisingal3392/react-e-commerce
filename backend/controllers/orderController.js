
const Order =require('../models/order')

const createOrder=async(req,res)=>{

    try{

        const{orderNumber,customer,products,subTotal,shipping,total} =req.body

        const newOrder =new Order({

            orderNumber:orderNumber,
            customer:customer,
            products:products,
            subTotal,
            shipping,
            total
        })


        await newOrder.save()

        res.status(201).json({
            message:"Order created succesfully",
            order:newOrder
        })

    }
    catch(err){

         if (err.code === 11000) {
        return res.status(409).json({
            message: "This order number already exists"
        });
    }

        console.log(err.message);
        res.status(500).json({
            message:`server error,${err}`
        })
        
    }


}


const getOrder =async(req,res)=>{


    try{

      const orderId = req.params.orderId

        const orderData = await Order.findById(orderId).select("orderNumber products customer subTotal shipping total")
         
        if(!orderData){

            return res.status(404).json({
                message:"Order not found"

            })
        }
        res.status(200).json({
            message:"Order details fetched succesfully",
            orderData
        })
    }
    catch(err){
        
        console.error("Get order error:", err);

        res.status(500).json({

            message:`Server error `

        })

    }
}
module.exports ={createOrder,getOrder}