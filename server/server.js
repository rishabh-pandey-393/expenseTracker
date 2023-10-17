const express=require('express')
var cors=require('cors');
const fs=require('fs');
require('dotenv').config();
// import connectToMongo from './db';
const connectToMongo=require('./db.js');
const app=express();
app.use(cors());

// database connection
connectToMongo();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// autoload routes
fs.readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log(`Server running on port ${port}`));
