import image1 from '../../../assets/home-banner.png'
import image2 from '../../../assets/new-arrivals-banner.png'
import image3 from '../../../assets/electronics-banner.png'


export const images: string[] = [image1, image2, image3]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex
