export const generateUniqueId = () => {
  const id = Math.random().toString(36).substring(2, 9);
  return id;
};

export const generateFileName = (prefix: string, id: string) => {
  return `${prefix}_${id}.ini`;
};

export const getFriendlyTitleInput = (key: string) => {
  const titleMap: Record<string, string> = {
    inputFiles: 'Input Files',
    inputType: 'Input Type',
    inputFileList: 'Input File List',
    inputFileClasses: 'Input File Classes',
    datasetImagesPath: 'Dataset Images Path',
  };
  return titleMap[key] || key;
};
