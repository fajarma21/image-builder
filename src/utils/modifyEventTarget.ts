const modifyEventTarget = (
  eventTarget: EventTarget & HTMLInputElement,
  targetValue: string,
  targetType = 'text',
) => {
  const clonedTarget = eventTarget.cloneNode(true) as HTMLInputElement;
  clonedTarget.type = targetType;
  clonedTarget.value = targetValue;

  return clonedTarget;
};

export default modifyEventTarget;
