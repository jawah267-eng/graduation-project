const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

//هون كتبت route handler مشان upload file image
//post:  /api/upload رابط الرفع
router.post("/", upload.array("image", 5), async (req, res) => {
  console.log("headers:", req.headers["content-type"]);
  console.log("files:", req.files);
  console.log("body:", req.body);
  //نتاكد اذا في صورة انرفعت او لا
  try {
    //اذا لم يتم تحميل اي صورة نرجع استجابة خطأ يعني طلب غير صالح
    //يعني خطأفي الواجهة الامامية اي ان التحميل قد فشل
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "no file uploaded",
      });
    }
    // اذا كان المللف موجود نرسل استجابة نجاح ويحدد  مسار ملف موقع الصورة
    //المحملة على الخادم او التخزين السحابي
    res.status(200).json({
      success: true,
      message: "images uploaded successfully",
      imageurl: req.files.map((file) => file.path),
    });
  } catch (error) {
    //اذا تم تحميل الصورة وطلع في خطأ بالخادم الداخلي
    return res.status(500).json({
      success: false,
      message: "failed to upload image",
      error: error.message,
    });
  }
});

module.exports = router;
