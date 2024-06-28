import type { NextPage } from 'next'
import ImageUpscaleSlider from './_component/Slider'



const Home: NextPage = () => {
  return (
    <div>
      <h1>Image Painter</h1>
      <ImageUpscaleSlider beforeImage='/cbl.png' afterImage='/chibi1.png'/>
    </div>
  )
}

export default Home
