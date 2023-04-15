import express from "express";
import multer from "multer";
import fs from "fs";
import Founder from "../models/founderModel";

const storage = multer.memoryStorage(); // store files in memory as buffers
const upload = multer({ storage: storage });

const router = express.Router();

// Add the following middleware to handle file uploads
router.use(upload.any()); // Allow any type of file to be uploaded

router.post("/savefounder", async (req, res) => {
  try {
    const { data } = req.body;

    // Convert uploaded files to strings
    let uploadedFiles: any[] = [];
    if (Array.isArray(req.files)) {
      uploadedFiles = req.files;
    } else if (typeof req.files === "object" && req.files !== null) {
      uploadedFiles = Object.values(req.files).flat();
    }

    const fileData: any = {};
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const fileBuffer = fs.readFileSync(file.path);
      fileData[file.fieldname] = fileBuffer.toString("base64");
    }

    // Add file data to the survey data
    const newData = { ...data, ...fileData };

    const newSurvey = new Founder(newData);
    const mres = await newSurvey.save();
    res.json(mres);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});

export default router;
