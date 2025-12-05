import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        Id:{type:String,required:[true,"Id is Required"]},
        Type:{type:Boolean,required:[true,"Type is Required"]},
        Text:{type:String,required:[true,"Text is Required"]},
        Sender:{type:String,required:[true,"Sender is Required"]},
        SocketId:{type:mongoose.Schema.Types.ObjectId,required:[true,"Socket Id is Required"]},
        SenderId:{type:mongoose.Schema.Types.ObjectId,required:[true,"Sender Id is Required"]},
        ReceiverId:[{type:mongoose.Schema.Types.ObjectId,required:[true,"Receiver Id is Required"]}]
    }
)

const Message = new mongoose.model('message',messageSchema)
export default Message