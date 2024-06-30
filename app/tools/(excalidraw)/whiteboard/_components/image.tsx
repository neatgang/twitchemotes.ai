import { colorToCss } from "@/lib/utils";
import { ImageLayer } from "@/types/canvas";

interface ImageProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Image = ({
  id,
  layer,
  onPointerDown,
  // selectionColor,
}: ImageProps) => {
  const { x, y, width, height, src } = layer;

  return (
    <image
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      href={src}
      strokeWidth={1}
      stroke={"transparent"}
    />
  );
};