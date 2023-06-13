import  express  from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./userroute.js";



const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://kunal11295:kunal11295@cluster0.tnxk0aj.mongodb.net/awdizdb?retryWrites=true&w=majority')
.then(() => console.log("Db connected"))
.catch((err) => console.log("db error =>",err))

app.listen(8001,() => console.log("working on port 8001"));