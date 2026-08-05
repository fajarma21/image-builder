const capitalFirst = (text: string) => {
  return text.replace(/^\w/, text[0].toUpperCase());
};

export default capitalFirst;
