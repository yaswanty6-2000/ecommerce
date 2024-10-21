const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudService = require('../services/cloudService');

const upload = multer();

router.post("/file/upload", upload.single("file"), async (req, res) => {
  try {
    const fileUrl = await cloudService.uploadFile(req.file);
    res.status(200).json({ fileUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/file/list", async (req, res) => {
  try {
    const fileList = await cloudService.listFiles();
    res.send(fileList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/file/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  try {
    const fileData = await cloudService.downloadFile(filename);
    res.send(fileData);
  } catch (error) {
    console.error(error);
    res.status(404).send("File Not Found");
  }
});

router.delete("/file/delete/:filename", async (req, res) => {
  const filename = req.params.filename;
  try {
    await cloudService.deleteFile(filename);
    res.send("File Deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
