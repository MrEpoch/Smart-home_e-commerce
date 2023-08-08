import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
    cb(null, 'uploads/');
  },
    filename: function (req: Request, file, cb) {
    cb(null, file.originalname.split(" ").join("_").toLowerCase());
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // 5MB file size limit (adjust as needed)
  },
    fileFilter: function (req: Request, file, cb) {
    // Check if the uploaded file is an image (you can add more checks here)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
});
