import { fabric } from 'fabric';

declare module 'fabric' {
  namespace fabric {
    interface Canvas {
      toBlob(callback: (blob: Blob | null) => void, type?: string, quality?: number): void;
    }
  }
}