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

/**
 * Counts the number of lines in a text file
 * @param file - The file to count lines from
 * @returns Promise<number> - The number of lines in the file
 */
export const countFileLines = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        resolve(lines.length);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Counts the number of lines in a text file from a URL
 * @param fileUrl - The URL of the file to count lines from
 * @returns Promise<number> - The number of lines in the file
 */
export const countFileLinesFromUrl = async (fileUrl: string): Promise<number> => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.length;
  } catch (error) {
    console.error('Error counting file lines:', error);
    throw error;
  }
};
