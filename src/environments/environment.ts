const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = process.env.NEXT_PUBLIC_URL_API;

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_URL_API is not set');
}

export const environment = {
  production: isProduction,
  urlApi: apiUrl,
};
