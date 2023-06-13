import express from "express";
import { addproduct,decryptLogin,encryptregister,getAllProducts, getProducts, getbycolor, getbyprice, productdata} from "./productcontroller.js/controller.js";
import { decryptforLogin,userregister } from "./productcontroller.js/usercontroller.js";
import { authpin } from "./productcontroller.js/middleware/authmiddleware.js";




var router =express.Router();

router.post('/add-product',addproduct)
router.get('/get-All-Product',getAllProducts)
router.get('/getproducts',getProducts)
router.get('/product-data',productdata)
router.get('/getby-price',getbyprice)
router.get('/getby-color',getbycolor)
router.post('/encrypt-register',encryptregister)
router.post('/decrypt-Login',decryptLogin)
router.post('/user-register',userregister)
router.post('/decryptfor-Login',authpin,decryptforLogin)




export default router;