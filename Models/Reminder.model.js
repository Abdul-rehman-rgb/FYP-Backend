import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
    {
        User_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"User id is Required"],ref:"User"},
        Title:{type:String,required:[true,"Title is Required"]},
        Date:{type:Date,required:[true,"Date is Required"]},
        Color:{type:String,required:[true,"Color is Required"]}
    }
)

const Reminder = new mongoose.model('Reminder',reminderSchema)
export default Reminder