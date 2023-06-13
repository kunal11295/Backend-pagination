 import {response} from "express";
import Product from "../model/product.js";
import register from "../model/register.js";
import encrypt from 'encryptjs';

export const addproduct = async(req,res)  => {

    try{
     console.log(req.body)
 
     const {Name,Price,Image,Category,Color,Brand,Size} =req.body;
     if(!Name) return res.send("name is required");
     if(!Price) return res.send("Price is required");
     if(!Image) return res.send("Image is required");
     if(!Category) return res.send("Category is required");
     if(!Color) return res.send("color is required");
     if(!Brand) return res.send("brand is required");
     if(!Size) return res.send("Size is required");

 
     const product= new Product({
         name:Name,
         price:Price,
         image:Image,
         category :Category,
         color:Color,
         brand:Brand,
         size: Size
        })
     console.log(product,"check here")
     await product.save()
     return res.send(product);
 } catch(error) {
     console.log(error)
 }
 }

 export const getAllProducts = async (req, res) => {
    try{
        const response = await Product.find().exec()
        if(response){
            return res.send(response);
        }else{
            return res.send("Products not found!")
        }

    }catch(error){
        return res.send(error);
    }
}

export const getProducts = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 4} = req.query;

    try {
        // execute query with page and limit values
        const products = await Product.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();  
        // get total documents in the Posts collection 
        const count = await Product.count();

        // return response with posts, total pages, and current page
        res.json({
            products,
            totalPages:(count/limit),
            currentPage: page
        });




    } catch (err) {
        console.error(err.message);
    }
}


export const productdata = async (req,res) => {

    const products = await Product.find(req.query)
    console.log(req.query);
    
   res.json({products});
}



export const getbyprice = async (req,res) =>
{
    try{
        const{lowprice,highprice} = req.body;

    const response = await Product.find({price:{
        $gte:lowprice,
        $lte:highprice,
       }
    }).exec()
       if(response)
       {
        return res.send(response);
    }else{
        return res.send("Products not found!")
    }
}catch(error){
    return res.send(error);
}
}



export const getbycolor = async (req,res) =>
{
    try{
        const{color} = req.body;

    const response = await Product.find({color:{}
    }).exec()
       if(response)
       {
        return res.send(response);
    }else{
        return res.send("Products not found!")
    }
}catch(error){
    return res.send(error);
}
}




export const encryptregister = async (req,res) =>
{
    try{
        const{email,password} = req.body;
        // if(!name) return res.send("name is required");
        if(!email) return res.send("email is required");
        if(!password) return res.send("password is required");
        // if(!confirmpassword) re+turn res.send("confirmpassword");

        let secretkey='kunal123';
        let plaintext   = password;
        let ciphertext = encrypt.encrypt(plaintext,secretkey,256);
        // console.log(ciphertext +"");

        const registeruser = new register({ 
        email:email,
        password:ciphertext
    })
    await registeruser.save();
    return res.send("registration successful");
}
    catch(error)
    {
        return res.send(error);
    }
}


export const decryptLogin = async (req,res) =>
{
    try{
        const{email,password} = req.body;

        if(!email) return res.send("email is required")
        if(!password) return res.send("password is required")

        let secretkey = "kunal123  ";
        // let plaintext = "password";

        const user = await register.find({email}).exec()

        let decipher = encrypt.decrypt(user[0].password,secretkey,256)
        console.log(decipher)

        if(decipher == password)
        {
        return res.send("login sucessfull")
        }
        else
        {
            return res.send("login UnSucessful")
        }
    }
    catch(error)
    {
        return res.send(error);
    }
}



