"use client";

import Carousel from "./components/CarouselFeature";
import Magnet from "./components/Magnet";
import Threads from "./components/Threads";
import SpotlightCard from "./components/SpotlightCard";
import TiltedCard from "./components/TiltedCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col flex-wrap items-center justify-center">

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
          <h1 className="font-bold lg:text-8xl md:text-7xl sm:text-6xl mb-16 tracking-tighter bg-gradient-to-r from-gray-600 via-black-500 to-gray-300/80 inline-block text-transparent bg-clip-text min-h-55">
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
      
      {/* HOW IT WORKS SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-6xl ml-20">How it <i className="tracking-tighter">works?</i></h1>
            <p className="font-light text-xl mr-20">3 simple steps to get you started</p>
        </header>

        <div className="flex flex-wrap flex-row justify-center items-center p-3 m-20 mt-10 bg-gray-300/20 rounded-2xl"> 
          <SpotlightCard className="custom-spotlight-card bg-[#222] m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 1: Sign-Up</h2>
            <p>Create an account to join the Corefocus community today</p>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 2: Set Habits & End Goals</h2>
            <p>Establish long-term and short-term commitments to meet your goals</p>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 3: Track & Reflect</h2>
            <p>Regularly check-in to maintain your goals and reflect on wins and shortcomings</p>
          </SpotlightCard>
        </div>
      </section>

      {/* BENEFITS AND VALUE PROPOSITION SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center w-full">
            <h1 className="font-bold text-6xl ml-20">How <i className="tracking-tighter">Corefocus</i> benefits <i className="tracking-tighter">you?</i></h1>
        </header>

        <div className="flex flex-wrap flex-row justify-between items-center p-3 m-20 mt-10 rounded-2xl"> 
            <TiltedCard
            imageSrc="/asset_3.png"
            altText="Flow State"
            captionText="Flow State"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <span className="mt-10 text-gray-900">
                <h2 className="ml-5 mb-3 font-bold text-2xl  bg-gradient-to-r from-indigo-800 via-black-500 to-gray-300/80 inline-block text-transparent bg-clip-text">Designed for deep focus, not dopamine loops</h2>
              </span>
            }
          />
            <TiltedCard
            imageSrc="/asset_4.png"
            altText="Chart"
            captionText="Unified goals"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <span className="mt-10 text-gray-900">
                <h2 className="ml-5 mb-3 font-bold text-2xl  bg-gradient-to-r from-indigo-800 via-black-500 to-gray-300/80 inline-block text-transparent bg-clip-text">Unified goals, habits, and reflections</h2>
              </span>
            }
          />
            <TiltedCard
            imageSrc="/asset_5.png"
            altText="Light bulb image"
            captionText="Distraction-free"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <span className="mt-10 text-gray-900">
                <h2 className="ml-5 mb-3 font-bold text-2xl  bg-gradient-to-r from-indigo-800 via-black-500 to-gray-300/80 inline-block text-transparent bg-clip-text">Privacy-focused and distraction-free</h2>
              </span>
            }
          />
      </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-6xl ml-20">Our <i className="tracking-tighter">testimonials</i></h1>
            <p className="font-light text-xl mr-20">3 simple steps to get you started</p>
        </header>

        <div className="flex flex-wrap flex-row justify-center items-center p-3 m-20 mt-10 bg-gray-300/20 rounded-2xl"> 
          <SpotlightCard className="custom-spotlight-card m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 1: Sign-Up</h2>
            <p>Create an account to join the Corefocus community today</p>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 2: Set Habits & End Goals</h2>
            <p>Establish long-term and short-term commitments to meet your goals</p>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card m-10 min-h-100 w-100 text-center cursor-default text-white flex flex-col items-center justify-center" spotlightColor="rgba(234, 230, 238, 0.2)">
            <h2 className="text-4xl font-bold mb-3">Step 3: Track & Reflect</h2>
            <p>Regularly check-in to maintain your goals and reflect on wins and shortcomings</p>
          </SpotlightCard>
        </div>
      </section>

    </main>
  );
}
