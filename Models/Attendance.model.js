import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  Student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Student id is Required"],
    ref: "User",
  },
  Class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Class id is Required"],
    ref: "Classes",
  },
  Student_Name: {
    type: String,
    required: [true, "Student Name is Required"],
  },
  Day: {
    type: String,
    required: [true, "Day is Required"],
  },
  Date: {
    type: Date,
    required: [true, "Date is Required"],
  },
  Status: {
    type: Boolean,
    required: [true, "Status is Required"],
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
