export interface ImageCardProps {
  imageKey: string;
  imageUrl: string;
  isLoading: boolean;
  hasError: boolean;
  aspectRatio: 'original' | 'square';
  onLoad: () => void;
  onError: () => void;
  onLoadStart: () => void;
  onClick: () => void;
}
