
//import mongoose from 'mongoose';
import express from 'express'

const url = 'http://localhost:8000'
// export const uploadImage = (req,res)=>{
    
//     if(!req.file){
//         return res.status(404).json({msg:"file not found"})
//     }

//     const imageUrl = `${url}/file/${req.file.filename}`
//     return res.status(200).json(imageUrl)
// }

import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

// Assuming multer.memoryStorage() is used in `upload`
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "photos" });

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      // Construct URL for frontend
      //const url = `${req.protocol}://${req.get("host")}/file/${uploadStream.id}`;
      const imageUrl = `${url}/file/${uploadStream.id}`;

      res.status(200).json({url: imageUrl }); // ✅ Return URL
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getImage = async(req,res)=>{
    try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "photos" });
    const _id = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(_id);

    downloadStream.on("error", () => res.sendStatus(404));
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
