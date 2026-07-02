const isTextEditing = () => {
  const el = document.activeElement;

  if (!el) {
    return false;
  }

  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el.hasAttribute('contenteditable')
  );
};

export default isTextEditing;
