// Detect if running in browser (client-side) or server-side
const isClient = typeof window !== 'undefined';

// For client-side (browser), use localhost since the browser can't resolve Docker service names
// For server-side (SSR), use the Docker service name
const getApiUrl = () => {
  let baseUrl;
  
  if (isClient) {
    // Running in browser - check for production ngrok URL first, then fallback to localhost
    baseUrl = process.env.NEXT_PUBLIC_URL_API_PRODUCTION || 
              process.env.NEXT_PUBLIC_URL_API_LOCAL || 
              'http://localhost:8080';
  } else {
    // Running on server - use Docker service name
    baseUrl = process.env.NEXT_PUBLIC_URL_API_LOCAL || 'http://api:8080';
  }
  
  // Remove trailing slash to prevent double slashes when concatenating
  return baseUrl.replace(/\/$/, '');
};

const config = {
  udlfApi: getApiUrl(),
};

export default config;
