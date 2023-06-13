import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    name:String,
    price:Number,
    category : String,
    image : [String],
    color: String,
    brand:String,
    size:Number,
});

export default mongoose.model("Product",Product)