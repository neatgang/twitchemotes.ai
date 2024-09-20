import { memo } from "react";
import { ImageLayer } from "@/types/canvas";

interface ImageProps {
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent) => void;
  // selectionColor?: string;
}

export const Image = memo(({
  layer,
  onPointerDown,
  // selectionColor,
}: ImageProps) => {
  const { x, y, width, height, url } = layer;  // Changed 'src' to 'url'

  return (
    <image
      onPointerDown={onPointerDown}
      href={url}  // Changed 'src' to 'href' and use 'url'
      x={x}
      y={y}
      width={width}
      height={height}
      // style={{
      //   outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
      // }}
    />
  );
});

Image.displayName = "Image";