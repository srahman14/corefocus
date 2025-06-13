"use client";

import Carousel from "./components/CarouselFeature";
import Magnet from "./components/Magnet";
import CardSwap, { Card } from "./components/CardSwap"; 
import Threads from "./components/Threads";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-wrap items-center justify-center">

      {/* HERO SECTION */}
      {/* <section className="w-full h-screen flex items-center justify-center text-center flex-row gap-30">  
          <div>
            <h1 className="font-bold text-6xl mb-16">Build habits today. <br></br> Achieve your goals.</h1>
            <div className="x-space-4">
                <a href="#" className="bg-gray-200 mr-4 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">Sign-Up</a>
                <a href="#" className="bg-gray-200 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">Plans</a>
            </div>
          </div>
          <img src="/asset_1.webp" className="w-90"></img>
      </section> */}

      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white text-black">
        {/* Threads background */}
        <div className="absolute inset-0 z-0">
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="font-bold lg:text-8xl md:text-7xl sm:text-6xl mb-16 tracking-tighter text-black">
            Build habits <i>today</i> <br /> Achieve your <i>goals</i>
          </h1>
          <div className="space-x-4">
            <a href="#" className="bg-gray-200 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">
              Sign-Up
            </a>
            <a href="#" className="bg-gray-200 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">
              Plans
            </a>
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-6xl ml-20">Explore our key <i className="tracking-tighter">features</i></h1>
            <p className="font-light text-xl mr-20">Designed to help you stay on track, effortlessly</p>
        </header>
        {/* To hold all the cards */}
         <div className="flex flex-wrap justify-center gap-8 items-center p-3 m-20 mt-10 bg-gray-300/20 rounded-2xl"> 
          <div className="bg-gray-300/40 p-7 m-8 flex flex-col items-center rounded-2xl ">
              <h2 className="text-2xl font-bold tracking-tighter">Quick <i>links</i></h2>
              
              {/* NEED TO ADD LINKS LATER ON */}
              <div className="p-3 flex flex-col gap-8">
                  <Magnet padding={50} disabled={false} magnetStrength={13}>
                      <div className="container bg-[#222] text-white p-2 rounded-lg">
                          <span className="flex justify-center items-center w-70">
                            <i className="fa-solid fa-bell"></i>
                            <p className="text-xl font-bold p-3 cursor-pointer tracking-tighter text-center">Habit Tracker</p>
                          </span>
                      </div>
                  </Magnet>

                  <Magnet padding={50} disabled={false} magnetStrength={13}>
                      <div className="container bg-[#222] text-white p-2 rounded-lg">
                          <span className="flex justify-center items-center w-70">
                            <i className="fa-solid fa-chart-area"></i>
                            <p className="text-xl font-bold p-3 cursor-pointer tracking-tighter text-center">Goal Board</p>
                          </span>
                      </div>
                  </Magnet>

                  <Magnet padding={50} disabled={false} magnetStrength={13}>
                      <div className="container bg-[#222] text-white p-2 rounded-lg">
                          <span className="flex justify-center items-center w-70">
                            <i className="fa-solid fa-list-check"></i>
                            <p className="text-xl font-bold p-3 cursor-pointer tracking-tighter text-center">Task Sync</p>
                          </span>
                      </div>
                  </Magnet>

                  <Magnet padding={50} disabled={false} magnetStrength={13}>
                      <div className="container bg-[#222] text-white p-2 rounded-lg">
                          <span className="flex justify-center items-center w-70">
                            <i className="fa-solid fa-pen-to-square"></i>
                            <p className="text-xl font-bold p-3 cursor-pointer tracking-tighter text-center">Read Route</p>
                          </span>
                      </div>
                  </Magnet>

                  <Magnet padding={50} disabled={false} magnetStrength={13}>
                      <div className="container bg-[#222] text-white p-2 rounded-lg">
                          <span className="flex justify-center items-center w-70">
                            <i className="fa-solid fa-stopwatch"></i>
                            <p className="text-xl font-bold p-3 cursor-pointer tracking-tighter text-center">Focus Camp</p>
                          </span>
                      </div>
                  </Magnet>
              </div>
            </div>

          <div style={{ height: '400px', position: 'relative' }} className="m-20">
            <Carousel
              baseWidth={400}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>
      </section>

    </main>
  );
}
