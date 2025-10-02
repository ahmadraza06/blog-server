import express from 'express'
import { signUp,login,  } from '../controller/userController.js';
import { getImage, uploadImage } from '../controller/imageController.js';
import upload from '../middleware/upload.js';
import { createPost,deletePost,getPostById,getPosts, updatePost} from '../controller/postController.js';
import { authenticateToken } from '../middleware/jwtAuthenticate.js';
const router = express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:id',getImage);
//router.get('/file/upload',(req,res)=>{return res.send("Hello World")});
router.post('/create',authenticateToken,createPost);
router.get('/getposts',authenticateToken,getPosts);
router.get('/getpost/:id',authenticateToken,getPostById)
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete',authenticateToken,deletePost)

export default router;