"use client";

import Carousel from "./components/CarouselFeature";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-wrap items-center justify-center">
      {/* HERO SECTION */}
      <section className="w-full h-screen flex items-center justify-center text-center flex-row gap-30">
          <div>
            <h1 className="font-bold text-6xl mb-16">Build habits today. <br></br> Achieve your goals.</h1>
            <div className="x-space-4">
                <a href="#" className="bg-gray-200 mr-4 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">Sign-Up</a>
                <a href="#" className="bg-gray-200 hover:bg-gray-300/70 p-5 rounded-lg font-bold text-2xl">Plans</a>
            </div>
          </div>
          <img src="/asset_1.webp" className="w-90"></img>
      </section>
      {/* KEY FEATURES SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-6xl ml-20">Explore our key <i className="tracking-tighter">features</i></h1>
            <p className="font-light text-xl mr-20">Designed to help you stay on track, effortlessly</p>
        </header>
        {/* To hold all the cards */}
         <div className="flex flex-wrap justify-between items-center  p-3 m-20 mt-10 bg-gray-300/20 rounded-2xl"> 
          <div className="m-10 bg-gray-300/40">
            <h2>We have a range of key features</h2>
          </div>
          <div style={{ height: '400px', position: 'relative' }} className="m-30">
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

        {/* <div className="flex flex-wrap p-3 gap-10 ml-20"> 
          <div className="bg-gray-300/40 w-70 min-h-60 mt-10 rounded-lg flex flex-col justify-center">
            <span className="flex items-center p-3 justify-center gap-3">
              <i className="fa-solid fa-bell text-lg text-blue-400 text-xl"></i>
              <h2 className="font-semibold text-2xl tracking-tighter">Smart reminders</h2>
            </span>
            <p className="p-3 font-semibold text-xl">Reminders everyday to keep you on track with your desired goals.</p>
          </div>

          <div className="bg-gray-300/40 w-70 min-h-60 mt-10 rounded-lg flex flex-col justify-center">
            <span className="flex items-center p-3 justify-center gap-3">
              <i class="fa-solid fa-chart-bar text-red-600 text-xl"></i>
              <h2 className="font-semibold text-2xl tracking-tighter">Progress analytics</h2>
            </span>
            <p className="p-3 font-semibold text-xl">Reminders everyday to keep you on track with your desired goals.</p>
          </div>

          <div className="bg-gray-300/40 w-70 min-h-60 mt-10 rounded-lg flex flex-col justify-center">
            <span className="flex items-center p-3 justify-center gap-3">
              <i class="fa-solid fa-fire text-orange-400 font-bold text-xl"></i>
              <h2 className="font-semibold text-2xl tracking-tighter">Streak tracking</h2>
            </span>
            <p className="p-3 font-semibold text-xl">Reminders everyday to keep you on track with your desired goals.</p>
          </div>
        </div> */}
      </section>

    </main>
  );
}
