const uploadDisk = require("../configs/config.multer");

const uploadfile = async (req, res, next) => {
  // Dynamically build the fields array based on incoming form data
  const items = req.body.items || [];
  req.body.items = items.map((item, index) => {
    const files = req.files.filter(
      (file) => file.fieldname === `files_${index}`
    );

    return {
      ...item,
      files: files.map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        filename: file.filename,
        path: file.path,
        size: file.size,
      })),
    };
  });

  next();
};

module.exports = uploadfile;
