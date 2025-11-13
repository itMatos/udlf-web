// Detect if running in browser (client-side) or server-side
const isClient = typeof window !== 'undefined';

const TRAILING_SLASH_REGEX = /\/$/;

// For client-side (browser), use localhost since the browser can't resolve Docker service names
// For server-side (SSR), use the Docker service name
const getApiUrl = () => {
  let baseUrl: string;

  if (isClient) {
    // Running in browser - check for production ngrok URL first, then fallback to localhost
    baseUrl =
      process.env.NEXT_PUBLIC_URL_API_PRODUCTION || process.env.NEXT_PUBLIC_URL_API_LOCAL || 'http://localhost:8080';
  } else {
    // Running on server - use Docker service name
    baseUrl = process.env.NEXT_PUBLIC_URL_API_LOCAL || 'http://api:8080';
  }
  console.log('baseUrl', baseUrl);

  // Remove trailing slash to prevent double slashes when concatenating
  return baseUrl.replace(TRAILING_SLASH_REGEX, '');
};

/**
 * Obtém o modo de execução da API para sinalizar ao backend
 * Valores possíveis: 'demo' | 'docker' | undefined (padrão)
 *
 * Use a variável de ambiente NEXT_PUBLIC_API_MODE para definir:
 * - 'demo' ou 'vercel' para versão de demonstração
 * - 'docker' ou 'local' para versão Docker local
 */
export const getApiMode = (): string | undefined => {
  const mode = process.env.NEXT_PUBLIC_API_MODE?.toLowerCase();

  if (mode === 'demo' || mode === 'vercel') {
    return 'demo';
  }

  if (mode === 'docker' || mode === 'local') {
    return 'docker';
  }

  return ''; // Padrão caso não seja definido
};

const config = {
  udlfApi: getApiUrl(),
  apiMode: getApiMode(),
};

export default config;
