const isEmptyObject = (obj: Record<string, unknown> | null) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default isEmptyObject;
