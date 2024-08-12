const imageInput = document.getElementById('image');
const convertBtn = document.getElementById('convert-btn');
const pdfContainer = document.getElementById('pdf-container');

convertBtn.addEventListener('click', () => {
  const image = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageData = e.target.result;
    const pdf = new jsPDF();
    pdf.addImage(imageData, 'JPEG', 0, 0);
    const pdfData = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);

    const pdfLink = document.createElement('a');
    pdfLink.href = pdfUrl;
    pdfLink.download = 'image.pdf';
    pdfLink.click();
  };

  reader.readAsDataURL(image);
});
