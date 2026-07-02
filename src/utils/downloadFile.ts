const downloadFile = (url: string, format?: string, name?: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name || 'image-builder'}.${format}`;
  a.click();
};

export default downloadFile;
