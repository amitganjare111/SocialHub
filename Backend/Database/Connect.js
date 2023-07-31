const mongoose = require("mongoose");
const DB =process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("Database connection successfull");
}).catch((err) => {
    console.log(err)
console.log("connection failed");
});