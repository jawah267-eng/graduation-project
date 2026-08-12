const { default: bcrypt } = require("bcryptjs");
const express = require("express");
const router = express.Router();

// Sign Up
router.post("/signup", (req, res, next) => {
    let {name,email,password, role,dateOfBirth}= req.body;
    name = name.tirm();// مشان المسافات 
    email= email.tirm();
    password= password.tirm();
    role= role.tirm();
    dateOfBirth= dateOfBirth.tirm();
// اذا كانت فارغة 
    if (name== "" || email=="" || password=="" || role=="" || dateOfBirth==""){
        res.json({
            status:"FAILED",
            message:"Empty input fields!"
        });
    }// اذا المستخدم دخل رموز الى خانة الاسم 
    else if (!/^[a-zA-Z ]*$/.test(name)){
        res.json({
            status:"FAILED",
            message:"Invalid name entered"
        })
    }
    // التحقق من تنسيق البريد الكتروني
    else if(!/^[w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
                res.json({
            status:"FAILED",
            message:"Invalid email entered"
        })
    }
    //  التحقق من صحة التاريخ
    else if(!new Date(dateOfBirth).getTime()){
        res.json({
            status:"FAILED",
            message:"Invalid date of birth entered"
        })
    } else if(password.length <8){
        res.json({
            status:"FAILED",
            message:"Password is too short!"
        })
    }else {
        // يدنا نتاكد اذا المستخدم موجود مسبقا
            User.find({email}).then(result=>{
                if(result.length){
                    //المستخدم موجود
                    res.json({
                        status:"FAILED",
                        message:"user with the provided email already exists"
                })
                }else 
                    // انشاء مستحدم جديد 
                    // تشفير كلمة المرور
                    const saltRounds=10;
                    bcrypt.hash(password,saltRounds).then(hashedpassword=>{


                    })).catch(err=>{
                res.json({
                status:"FAILED",
                message:"An error occured while hashing password! "
                })
            }) 
            })
                
            }}) .catch(err =>{
                console.log(err);
                res.json({
                status:"FAILED",
                message:"An error occured while checking for existing user! "
                })
            })
    
});

// Sign In
router.post("/signin", (req, res, next) => {});

module.exports = router;
