const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const StudentsSchema = new Schema({

    name : {
        type : String, 
        required : [true, "Lütfen isminizi giriniz"] 

    },

    surname : {
        type : String,
        required : [true, "Lütfen soyisminizi giriniz"]
    }, 

    email : {
        type : String, 
        required : [true, "Lütfen emailinizi giriniz"],
        unique : true,
        match : [emailRegex, "Lütfen geçerli bir email giriniz."]
    },

    password : {
        type : String,
        minlength : [8, "Şifreniz en az 8 karakterden oluşmalıdır."],
        required : [true, "Lütfen şifrenizi belirleyiniz."],
        select : false
        
    }, 

    confirmpassword : {
        type : String,
        required : [true, "Lütfen şifreyi tekrar giriniz."],
        select : false
    },

    deviceinfo: {
        type : String
    }
});

StudentsSchema.pre("save", function(next) {

    if (this.isModified("password")) {

        if(this.password !== this.confirmpassword) {

            const err = new Error("Parola eşleşmiyor.");
            return next(err);
        }
    }
    next();
});
module.exports = mongoose.model("Student", StudentsSchema);