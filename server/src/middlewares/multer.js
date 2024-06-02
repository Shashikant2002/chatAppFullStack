import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

let singleAvatar = multerUpload.single("avatar");

let attachmentMessage = multerUpload.array("files", 5);

export { singleAvatar, attachmentMessage };
