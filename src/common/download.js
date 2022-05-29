const downloadXlsFromBase64 = (b64, fileName, format) => {
  let link = document.createElement('a');
  link.download = `${fileName}.${format}`;
  link.href = 'data:application/octet-stream;base64,' + b64;
  link.click();
};

export default downloadXlsFromBase64