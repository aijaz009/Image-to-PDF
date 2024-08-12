const express = require('express');
const app = express();
const multer = require('multer');
const jspdf = require('jspdf');

const upload = multer({ dest: './uploads/' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/convert', upload.single('image'), (req, res) => {
  console.log('Received image:', req.file);
  const image = req.file;
  const pdf = new jspdf();
  pdf.addImage(image.buffer, 'JPEG', 0, 0);
  const pdfData = pdf.output('buffer');
  console.log('Generated PDF:', pdfData);
  res.set("Content-Disposition", `attachment; filename="image.pdf"`);
  res.set("Content-Type", "application/pdf");
  res.send(pdfData);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
