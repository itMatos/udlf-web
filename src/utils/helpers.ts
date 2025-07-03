export const generateUniqueId = () => {
  const id = Math.random().toString(36).substring(2, 9);
  return id;
};

export const generateFileName = (prefix: string, id: string) => {
  return `${prefix}_${id}.ini`;
};
