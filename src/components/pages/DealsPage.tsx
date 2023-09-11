import React from 'react'
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'

const DealsPage:React.FC = () => {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    
  return (
    <>
        <div className='container w-full'>

        <main className="sandbox">
          <section className="sandbox__carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </section>
        </main>

            <div className="flex flex-wrap justify-center mb-10">

            </div>

        </div>
    </>
  )
}

export default DealsPage