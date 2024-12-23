import { useState,useCallback ,useEffect,useRef} from 'react'
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useCarousel } from '../../hooks/useCarousel';
import VideoPlayer from '@/components/ui/VideoPlayer'

export default function NewPostCarousel({ images: initialImages, onDelete,setPostMedia ,type}) {
  const [images, setImages] = useState(initialImages)
  const { selectedIndex, setSelectedIndex, api } = useCarousel()
  const videoRef = useRef(null)



  useEffect(() => { 
    setImages(initialImages)
  },[initialImages])

  const handleDelete = useCallback((index) => {
    setImages(prevImages => {
      const newImages = prevImages.filter((_, i) => i !== index)
      if (index === prevImages.length - 1) {
        setSelectedIndex(Math.max(0, index - 1))
      } else {
        setSelectedIndex(Math.min(index, newImages.length - 1))
      }
      // setTimeout(() => api?.scrollTo(Math.min(index, newImages.length - 1)), 0)
      onDelete?.(index)
      setPostMedia(newImages)
      return newImages
    })
  },[images,onDelete])

  useEffect(() => {
    if (api.current) {
      const handleSelect = () => {
        setSelectedIndex(api.current?.selectedScrollSnap() || 0)
      }
      api.current.on('select', handleSelect)
      return () => {
        api.current?.off('select', handleSelect)
      }
    }
  }, [api, setSelectedIndex,initialImages,images])

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <Carousel 
          className="h-72"
          setApi={api.setApi}
          // opts={{
          //   loop: true,
          // }}
        >
          {type == 'image' && <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative  ">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Carousel image ${index + 1}`}
                  className="object-contain h-72 w-full rounded-lg bg-white"
                />
              </CarouselItem>
            ))}
          </CarouselContent>}
          {type == 'video' && <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative ">
                <VideoPlayer
                  src={URL.createObjectURL(image)}
                  alt={`Carousel image ${index + 1}`}
                  className="object-contain  h-72 bg-white"
                  mutePosition="left"
                />

              </CarouselItem>
            ))}
          </CarouselContent>}
        </Carousel>

        {/* Static Numeric Indicator */}
        {images.length > 1 && <div className="absolute top-3 right-3 bg-gray-50 text-black px-2 py-1 rounded-full font-mono text-xs z-10 border">
          {selectedIndex + 1}/{images.length}
        </div>}


        {/* Static Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 h-9 w-9 bg-black/70 hover:bg-black/70 text-white rounded-full z-10"
          onClick={() => handleDelete(selectedIndex)}
        >
          <img src="/delete.svg" className="h-4 w-4" />
        </Button>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-primary' : 'bg-primary/30'
            }`}
            onClick={() => api.current?.scrollTo(index)}
          />
        ))}
      </div>}
    </div>
  )
}
