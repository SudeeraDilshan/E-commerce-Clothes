const port = 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { type } = require('os');

app.use(express.json());
// app.use(cors()); 
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:3000'], // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with the requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

//database connection
mongoose.connect('mongodb+srv://dilshanrgs:LearnOrg21%23@cluster0.ybqa3k5.mongodb.net/')

//API creation
app.get('/', (req, res) => {
    res.send('Hello from the server side');
});

//images storage engine
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    console.log("uploaddd");
    res.json({
        success:1,
        image_url:`http://loaclhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product = mongoose.model("product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({}); 
    let id;
    if(  products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;

    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    }); 
    console.log(product);
    await product.save();
    console.log("saved"); 
    res.json({
        success:true,
        name:req.body.name 
    })
})

//creating api for deleting products
app.post("/removeproduct",async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    });
})

//creating api for getting products
app.get("/allproducts",async (req,res)=>{
    let products = await Product.find({})
    console.log("All products fetched");
    res.send(products);
    
})

// schema creating for User model

const Users = mongoose.model("Users",{
    name:{type:String},
    email:{type:String,
        unique:true},
    password:{type:String},
    cartData:{type:Object},
    date:{type:Date,
        default:Date.now
    }
    },
   )
// creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,message:"User already exists"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    });

    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token:token});

    //creating endpoint for user login
    app.post('/login',async (req,res)=>{
        let user = await Users.findOne({email:req.body.email});
        if(user){
            const passComapare = req.body.password ===user.password;
            if(passComapare){
                const data ={
                    user:{
                        id:user.id
                    }
                }
                const token = jwt.sign(data,'secret_ecom');
                res.json({success:true,token:token});
        }
        else{
            res.json({success:false,message:"Invalid password"});
        }
    }
    else{
        res.json({success:false,message:"User not found.wrong email"});
    
    }
})
})   

  //creating endpoint for newcollection data
  app.get('/newcollections',async (req,res)=>{

    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);

  })

app.listen(port, (error) => {
    if(!error) {
        console.log('Server is running on port', port);
    }
    else{
        console.log('Error starting the server'+ error);
    }
    
});