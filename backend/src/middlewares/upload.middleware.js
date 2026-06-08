import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination : "uploads/resumes",

    filename : (req,file,cb) =>{
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

const fileFilter = (req,file,cb) =>{
    const ext = path.extname(file.originalname);

    if (ext !== ".pdf") {
        return cb(new Error("Only PDF files are allowed"));

    }

    cb(null,true)

}

export const uploadResume = multer({
    storage,
    fileFilter,
});

