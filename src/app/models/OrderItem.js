import mongoose from "mongoose";
let orderItemSchema=new mongoose.Schema({
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true,
    }
})

export default mongoose.models.OrderItem || mongoose.model("OrderItem", orderItemSchema)