import multer from "multer";
import { Request } from "express";

export const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (
    req: Request,
    file,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const file_name = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file_name);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
