import {Swiper, SwiperSlide} from "swiper/react"

import 'swiper/css'

export default  LatestPosts = () =>{
    return<Swiper
    spaceBetween={50}
    slidePerView={3}
    >
        <SwiperSlide></SwiperSlide>
    </Swiper>
}