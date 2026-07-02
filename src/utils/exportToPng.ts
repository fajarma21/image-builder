import downloadFile from './downloadFile';

const exportToPng = (width: number, height: number) => {
  const svg = document.getElementById('viewport');

  if (!svg) return;
  const svgClone = svg.cloneNode(true);

  if (svgClone instanceof Element) {
    svgClone
      .querySelectorAll('[data-export="exclude"]')
      .forEach((node) => node.remove());
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgClone);

  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.width = width;
  img.height = height;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const pngUrl = canvas.toDataURL('image/png');

    URL.revokeObjectURL(pngUrl);

    downloadFile(pngUrl, 'png', 'new-image');
  };
  img.src = url;
};

export default exportToPng;
