import { OnProgressProps } from "react-player/base";

export interface IVideoPlayerProps {
  url: string;
  className?: string;
  previewImage?: string;
  onPlay: (e: boolean) => void;
  children: React.ReactNode;
  onChangeProgress: (e: string | number) => void;
  progress?: number;
  onProgress?: (e: OnProgressProps) => void;
}
