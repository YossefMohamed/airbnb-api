import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
      const id = uuidv4();
      cb(null, id + "-" + Date.now() + ".png");
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      cb(new Error("File type is not supported"), false);
      return;
    }

    cb(null, true);
  },
});
