
import multer from "multer";

import mongoose from "mongoose";

const upload = multer({ storage: multer.memoryStorage() });
export default upload;
// const storage = new GridFsStorage({
//     db:mongoose.connection,
//     file:(request,file)=>{
//         console .log("uploading file ",file.originalname, file.mimetype)
//         const match = ["image/png","image/jpg"];
//         if(match.indexOf(file.mimetype) === -1){
//             return `${Date.now()}-blog-${file.originalname}`;
//         }
//         return `${Date.now()}-blog-${file.originalname}`;
//         return{
//             bucketName:"photos",
//             filename:`${Date.now()}-blog-${file.originalname}`
//         }
//     }
// })

//export default multer({storage})