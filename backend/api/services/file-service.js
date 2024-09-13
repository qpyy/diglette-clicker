const fs = require("fs");
const path = require("path");
const { FileNotFound } = require("../middleware/error-handler");

const getFileByName = async (pathFile) => {
  try {
    // console.log("Название директории", path.join(__dirname, '../skins', pathFile));
    if (!fs.existsSync(path.join(__dirname, '../images/skins/', pathFile))) {
      throw new FileNotFound("FILE_NOT_FOUND");
    }
    const fileContent = await fs.promises.readFile(path.join(__dirname, '../images/skins/', pathFile));
    return fileContent;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { getFileByName };