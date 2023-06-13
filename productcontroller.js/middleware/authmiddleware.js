import users from "../../model/user.js";
import encrypt from "encryptjs";

export const authpin = async (req,res,next) =>
{
    try{
        const {email,pin} = req.body;
        if(!email) return res.send("email is required")
        if(!pin) return res.send("pin is required")

        var secrectkey = "apple"
        const response = await users.find({email}).exec();

        var decipher = encrypt.decrypt(response[0].pin,secrectkey,256)
        console.log(decipher);

        if( decipher == pin)
        {
           next();
        }
        else
        {
            return res.send("PIN is Wrong")
        }
    }catch(error)
    {
        return res.send(error)
    }
}


