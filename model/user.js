import mongoose from "mongoose";
import { Schema } from "mongoose";

const users = new Schema
({
    name:String,
    email: String,
    password:String,
    pin:String
})

export default mongoose.model("users",users)