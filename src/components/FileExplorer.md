# FileExplorer Component

O componente `FileExplorer` permite navegar pelos arquivos mapeados no Docker através de uma interface similar a um explorador de arquivos.

## Funcionalidades

- **Navegação de diretórios**: Navegue pelos diretórios do container Docker
- **Busca de arquivos**: Busque arquivos por nome com suporte a wildcards
- **Filtros por extensão**: Filtre arquivos por extensões específicas
- **Seleção múltipla**: Suporte para seleção de múltiplos arquivos
- **Breadcrumbs**: Navegação através de breadcrumbs
- **Interface responsiva**: Interface adaptável e moderna

## Como Usar

### Exemplo Básico

```tsx
import FileExplorer from './FileExplorer';

function MyComponent() {
  const handleFileSelect = (filePath: string) => {
    console.log('Arquivo selecionado:', filePath);
  };

  return (
    <FileExplorer
      onFileSelect={handleFileSelect}
      fileExtensions={['txt', 'csv', 'json']}
    />
  );
}
```

### Exemplo com Seleção Múltipla

```tsx
import FileExplorer from './FileExplorer';

function MyComponent() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = (filePaths: string) => {
    const files = filePaths.split(',').filter(Boolean);
    setSelectedFiles(files);
  };

  return (
    <FileExplorer
      onFileSelect={handleFileSelect}
      selectedFiles={selectedFiles}
      multiple={true}
      fileExtensions={['jpg', 'png', 'gif']}
    />
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `onFileSelect` | `(filePath: string) => void` | - | Callback chamado quando um arquivo é selecionado |
| `selectedFiles` | `string[]` | `[]` | Lista de arquivos atualmente selecionados |
| `multiple` | `boolean` | `false` | Se permite seleção múltipla de arquivos |
| `fileExtensions` | `string[]` | `[]` | Extensões de arquivo permitidas (vazio = todas) |

## Integração com InputSettings

O componente está integrado no `InputSettings.tsx` para facilitar a seleção de arquivos de entrada:

- **Input Files**: Para arquivos de entrada principais
- **Image List File**: Para arquivos de lista de imagens
- **Input Classes File**: Para arquivos de classes
- **Dataset Images Path**: Para diretórios de imagens

## Endpoints da API

O componente utiliza os seguintes endpoints do `udlf-api`:

- `GET /api/directory/list` - Lista conteúdo de diretório
- `GET /api/directory/available-paths` - Lista diretórios disponíveis
- `GET /api/directory/search` - Busca arquivos
- `GET /api/directory/info/*` - Informações de arquivo/diretório

## Segurança

- Apenas diretórios específicos são acessíveis
- Validação de caminhos antes do acesso
- Tratamento de erros sem exposição de informações sensíveis

## Estilos

O componente utiliza Material-UI e segue o design system da aplicação:

- Ícones consistentes para arquivos e diretórios
- Cores e espaçamentos padronizados
- Tooltips informativos
- Estados de loading e erro
