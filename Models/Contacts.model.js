import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        UserId1:{type:mongoose.Schema.Types.ObjectId,required:[true,"user id 1 req"],ref:"User"},
        UserId2:{type:mongoose.Schema.Types.ObjectId,required:[true,"user id 2 req"],ref:"User"}
    }
)

const Contact = new mongoose.model('contact',contactSchema)
export default Contact