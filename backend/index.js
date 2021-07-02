require("dotenv").config();
const { check } = require("express-validator")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const path =require("path");
const{uploadImage, updateContact, createContact, deleteContact, getAllContacts} = require("./controller/contactController");


// Middleware
app.use(express.json());
app.use(cors());


app.use("/images",express.static(path.join(__dirname,'images')))
app.get("/", (req,res) => {
    res.json({"message": "Hi"})
});
app.post("/api/createContact", [
    check("firstname").isLength({min: 3}).withMessage("name should be min 3 char"),
    check("lastname").isLength({min: 3}).withMessage("name should be min 3 char"),
    check("email").isEmail().withMessage("enter valid email"),
    check("phone").isMobilePhone().withMessage("enter valid mobile number"),
    check("image").custom((value, {req}) => {
        if((req.files.mimetype === 'application/jpg') || (req.files.mimetype === 'application/jpeg') || (req.files.mimetype === 'application/png')){
            return true; // return "non-falsy" value to indicate valid data"
        }else{
            return false; // return "falsy" value to indicate invalid data
        }
    })
.withMessage('Please only submit valid image file type.'), // custom error message that will be send back if the file in not a pdf. 

],createContact);

app.put("/api/updateContact", updateContact);
app.delete("/api/deleteContact", deleteContact);
app.get("/api/getAllContacts", getAllContacts);




// DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB CONNECTED");
});






// PORT
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})