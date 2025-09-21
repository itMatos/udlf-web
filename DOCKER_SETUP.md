# Docker Setup para UDLF-Web

## Configuração do Docker Compose

O arquivo `docker-compose.yml` foi configurado para rodar tanto o frontend (udlf-web) quanto o backend (udlf-api) em containers separados.

### Variáveis de Ambiente Necessárias

Crie um arquivo `.env` na raiz do projeto udlf-web com as seguintes variáveis:

```env
# API Configuration
NEXT_PUBLIC_URL_API_LOCAL=http://localhost:8080

# Dataset Path Configuration
HOST_UDLF_PATH=/path/to/your/datasets/
```

### Exemplo de Configuração

```env
NEXT_PUBLIC_URL_API_LOCAL=http://localhost:8080
HOST_UDLF_PATH=/Users/username/Documents/datasets/
```

## Como Usar

### 1. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env` (se existir)
2. Configure a variável `HOST_UDLF_PATH` com o caminho para seus datasets
3. A variável `NEXT_PUBLIC_URL_API_LOCAL` deve apontar para a API (geralmente `http://localhost:8080`)

### 2. Executar os Containers

```bash
# Parar containers existentes (se houver)
docker-compose down

# Construir e executar os containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar os containers
docker-compose down
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080

## Estrutura dos Containers

### Frontend Container (udlf-web-frontend)
- **Porta**: 3000
- **Volumes**: Código fonte mapeado para desenvolvimento
- **Dependências**: Aguarda o backend estar pronto

### Backend Container (udlf-web-api)
- **Porta**: 8080
- **Volumes**: 
  - Código fonte da API
  - Datasets mapeados de `HOST_UDLF_PATH` para `/app/Datasets`
- **Rede**: Conectado à mesma rede do frontend

## Rede

Os containers estão conectados à rede `udlf-network` para comunicação interna.

## Desenvolvimento

Para desenvolvimento, os volumes estão mapeados para permitir hot-reload:
- Código fonte do frontend: `./` → `/app`
- Código fonte da API: `../udlf-api` → `/app`
- Datasets: `HOST_UDLF_PATH` → `/app/Datasets`

## Troubleshooting

### Problema: API não responde
- Verifique se o container da API está rodando: `docker ps`
- Verifique os logs: `docker-compose logs backend`
- Verifique se a variável `HOST_UDLF_PATH` está configurada corretamente

### Problema: Frontend não carrega
- Verifique se o container do frontend está rodando: `docker ps`
- Verifique os logs: `docker-compose logs frontend`
- Verifique se a variável `NEXT_PUBLIC_URL_API_LOCAL` está configurada corretamente

### Problema: Datasets não aparecem
- Verifique se o diretório `HOST_UDLF_PATH` existe e contém os datasets
- Verifique se o mapeamento de volumes está correto
- Reinicie os containers após alterar `HOST_UDLF_PATH`
