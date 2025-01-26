import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useGetBannersQuery } from '../../../services/api'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.5,
    slidesToSlide: 1,
  },
}

const BannerSection = () => {
  const { data: banners, isLoading } = useGetBannersQuery()

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden pb-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex-shrink-0 w-[280px] h-[180px] bg-gray-200 rounded-xl"
          />
        ))}
      </div>
    )
  }

  if (!banners?.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Temukan promo menarik</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={false}
        itemClass="px-2"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden aspect-[2.5/1]"
          >
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/placeholder-banner.png'
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default BannerSection
