

const mongoose =require('mongoose')

const connectDB =async()=>{

    try{

    await mongoose.connect(process.env.MONGODB_URI)

    console.log("Mongodb connection succesfully");
    


}
catch(err){
    console.log("MongoDb error",err);
    throw err
    
}


}

module.exports =connectDB


