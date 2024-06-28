import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

interface ImageUpscaleSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ImageUpscaleSlider: React.FC<ImageUpscaleSliderProps> = ({ beforeImage, afterImage }) => {
  return (
    <Card className="image-upscale-slider">
      <ReactCompareSlider 
        defaultValue={50}
        itemOne={<Image src={beforeImage} alt="Before Upscale" width={500} height={500} />}
        itemTwo={<Image src={afterImage} alt="After Upscale" width={500} height={500} />}
      />
    </Card>
  );
};

export default ImageUpscaleSlider;