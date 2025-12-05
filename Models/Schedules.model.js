import mongoose from "mongoose";

const schedulesSchema = new mongoose.Schema(
    {
        Class_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Class id is Required"],ref:"Classes"},
        Day:{type:String,required:[true,"Day is Required"]},
        Start_Time:
        {
            type: String,
            match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // e.g., "09:30"
            required:[true,"Start_Time missing or invalid format"]
        },
        End_Time:
        {
            type: String,
            match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // e.g., "09:30"
            required:[true,"End_Time missing or invalid format"]
        }
    }
)

const Schedules = new mongoose.model('Schedules',schedulesSchema)
export default Schedules