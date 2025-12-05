import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        RoomName:{type:String},
        pfp:{type:String},
        Members:[mongoose.Schema.Types.ObjectId]
    }
)

const Room = new mongoose.model('room',roomSchema)
export default Room