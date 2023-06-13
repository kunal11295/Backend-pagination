import mongoose from "mongoose";
import { Schema } from "mongoose";

const register = new Schema({
    email:String,
    password:String
});

export default mongoose.model("register",register)