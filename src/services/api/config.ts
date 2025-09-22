// Detect if running in browser (client-side) or server-side
const isClient = typeof window !== 'undefined';

// For client-side (browser), use localhost since the browser can't resolve Docker service names
// For server-side (SSR), use the Docker service name
const getApiUrl = () => {
  if (isClient) {
    // Running in browser - use localhost
    console.log('process.env.NEXT_PUBLIC_URL_API_LOCAL', process.env.NEXT_PUBLIC_URL_API_LOCAL);
    return 'http://localhost:8080';
  } else {
    console.log('process.env.NEXT_PUBLIC_URL_API_LOCAL', process.env.NEXT_PUBLIC_URL_API_LOCAL);
    // Running on server - use Docker service name
    return process.env.NEXT_PUBLIC_URL_API_LOCAL || 'http://api:8080';
  }
};

const config = {
  udlfApi: getApiUrl(),
};

export default config;
