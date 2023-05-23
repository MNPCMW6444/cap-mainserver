import mongoose from "mongoose";
import Grid from "gridfs-stream";
import multer from "multer";
const GridFsStorage = require("multer-gridfs-storage").default;

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.SAFE,
  file: (_: any, file: any) => {
    return new Promise((resolve) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

export default upload;
