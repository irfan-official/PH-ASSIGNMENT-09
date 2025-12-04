import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Nav from "./Nav.jsx";
import { FaArrowUpLong } from "react-icons/fa6";
import Hero_Text from "./Hero_Text.jsx";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaLongArrowAltDown } from "react-icons/fa";

function Hero() {
  const handleScroll = () => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("services");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full h-[45vh] md:h-[90vh] overflow-hidden ">
      <section className="m-5 mx-10 h-[40vh] md:h-[85vh] relative rounded-3xl overflow-hidden">
        <div className=" h-full bg-black flex  justify-center relative z-[888]">
          <span className="_indicator_ text-white text-6xl absolute bottom-5 left-[48.5%] z-[99999]  animate-bounce   hover:bg-white hover:text-black rounded-full p-1 transition-all duration-300 delay-100 border border-white/40">
            <span onClick={handleScroll} className="cursor-pointer ">
              <RiArrowDownDoubleLine />
            </span>
          </span>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center"
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center"
                    src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center"
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center bg-center"
                    src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Hero;
