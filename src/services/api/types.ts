export interface ResponseApi {
  message: string;
  error: string;
  output: string;
}

export interface LineContentResponse {
  line: number;
  lineContent: string;
}

export interface ImageNameLineMatch {
  imageName: string;
  lineNumber: number;
}