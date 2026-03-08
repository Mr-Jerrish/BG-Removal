import multer from "multer";

// creating multer middleware for parsing formData

const storage = multer.diskStorage({
  filename: function (re, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
