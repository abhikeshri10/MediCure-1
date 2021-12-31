const fs = require('fs');
const baseUrl = 'http://localhost:5000/uploads/';

const getListFiles = (req, res) => {
  const directoryPath =
    'C:\\Users\\ABHINAV\\Desktop\\project\\MediCure\\server\\uploads\\';

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath =
    'C:\\Users\\ABHINAV\\Desktop\\project\\MediCure\\server\\uploads\\';

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      });
    }
  });
};

module.exports = {
  getListFiles,
  download,
};
