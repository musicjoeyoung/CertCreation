console.log("Welcome to The Problem certificate maker.");
const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

submitBtn.addEventListener("click", () => {
  const val = userName.value;
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});
const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("Certificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );
  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  // Specify where the inputted text will land

  //This is a temporary pseudo-fix that will make the text render mostly centered.
  if (name.length > 9 && name.length <= 15) {
    firstPage.drawText(name, {
      x: 200,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else if (name.length < 7 && name.length > 5) {
    firstPage.drawText(name, {
      x: 300,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else if (name.length > 14 && name.length < 22) {
    firstPage.drawText(name, {
      x: 150,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else if (name.length <= 3) {
    firstPage.drawText(name, {
      x: 340,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else if (name.length === 4) {
    firstPage.drawText(name, {
      x: 325,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else if (name.length >= 22) {
    firstPage.drawText(name, {
      x: 80,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  } else {
    firstPage.drawText(name, {
      x: 300,
      y: 270,
      size: 58,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  }

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri, `${name}-is-Part-of-The-Problem__Membership.pdf`);
};
