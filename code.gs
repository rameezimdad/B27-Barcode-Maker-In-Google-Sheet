function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function saveData(autoID, name, barcodeText, base64Image) {
  // Open the spreadsheet and select the appropriate sheet
  const sheet = SpreadsheetApp.openById("").getSheetByName("Sheet1");
  
  // Determine the next available row
  const nextRow = sheet.getLastRow() + 1;
  
  // Prepare the data to be inserted
  const cell = sheet.getRange(nextRow, 1, 1, 3); // Inserting in columns A, B, and C
  
  // Decode the base64 image to a blob and create a file
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Image), 'image/png', 'barcode.png');
  const image = DriveApp.createFile(blob).getBlob();
  
  // Insert the data into the cells
  cell.setValues([[autoID, name, barcodeText]]);
  
  // Insert the image in the correct cell (column D)
  sheet.insertImage(image, 4, nextRow);
}
