import users from "../model/user.js";
import encrypt from 'encryptjs'
import {response } from "express";
import user from "../model/user.js";

export const userregister = async (req,res) =>{
    try{
        const {name,email,password,pin} =req.body;
        if(!name) return res.send("name is required");
        if(!email) return res.send("email is required");
        if(!password) return res.send("password is required");
        if(!pin) return res.send("pin is required");

        let secrectkey ="apple";
        let plaintext =password;
        let plaintextforpin = pin;
        let ciphertext = encrypt.encrypt(plaintext,secrectkey,256)
        let ciphertextforpin =encrypt.encrypt(plaintextforpin,secrectkey,256)

        if(password < 8)
        {
            return res.send("password is less than 8 charcter");        
        }
        const response = await users.find({email:email}).exec();
        if(response.length)
        {
            return res.send("email already register")
        }
        
        const user = new users({
            name:name,
            email:email,
            password:ciphertext,
            pin:ciphertextforpin
        })
      await user.save();
      return res.send("Registeration successfull");
    }
    catch(error)
    {
        return res.send(error)
    }
}

// .............../login/.................


// export const userlogin = async (res,req) =>
// {
//     try{
//         const {email,password} = req.body;
//         if(!email) return res.send("email is required");
//         if(!password) return res.send("password is required");
//         // if(!pin) return res.send("pin is required");
//         let secrectkey = "apple";
//         const user = await users.find({email}).exec();
//         let decipher = encrypt.decrypt(user[0].password,secrectkey,256);
//         console.log(decipher);

//             if(decipher == password)
//             {
//                 return res.send("Login successful");
//             }
//             else
//             {
//                 return res.send("Login Unsuccessful");
//             }
//         }
//         catch(error)
//         {
//             return res.send(error);
//         }
//     }



    export const decryptforLogin = async (req,res) =>
{
    try{
        const{email,password} = req.body;

        if(!email) return res.send("email is required")
        if(!password) return res.send("password is required")

        let secrectkey = "apple";
        // let plaintext = "password";

        const user = await users.find({email}).exec();

        let decipher = encrypt.decrypt(user[0].password,secrectkey,256)
        console.log(decipher)

        if(decipher == password)
        {
        return res.send("Login sucessfull");
        }
        else
        {
            return res.send("Login Unsucessfull");
        }
    }
    catch(error)
    {
        return res.send(error);
    }
}