"use client";

import Magnet from "../components/Magnet";
import SpotlightCard from "../components/SpotlightCard";
import AnimatedContent from "../components/AnimatedContent";
import ImageMarquee from "../components/ReactMarquee";
import FAQItem from "../components/FAQComponent";
import DarkVeil from "../components/ui/DarkVeil";
import Link from "next/link";
import { useThemeStore } from "../store/useThemeStore";

export default function Home() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
      <main className={`min-h-screen flex flex-col flex-wrap items-center justify-center transition-all duration-300 ease-in-out bg-black text-white`}>
      {/* HERO SECTION */}
      <section className="relative w-full h-[65vh] overflow-hidden flex items-center justify-center bg-white text-white">        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>
        
        <AnimatedContent
          direction="horizontal"
          reverse={true}
          duration={0.6}
          ease="in"
          animateOpacity
          threshold={0.2}
        >
          <div className="relative z-10 flex items-center justify-center text-center">
            <div
              className="p-17 rounded-lg"
              // style={{
              //   backgroundImage: `
              //     linear-gradient(to right, rgba(255, 255, 255, 0.33) 1px, transparent 1px),
              //     linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 1px, transparent 1px)
              //   `,
              //   backgroundSize: "90px 90px",
              // }}
            >
              <div>
                <h1 className="font-bold text-center text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tighter">
                  master your {" "}
                  <i className="underline decoration-[#520dd0] rounded">habits</i> <br />
                  achieve what  {" "}
                  <i className="underline decoration-[#520dd0] rounded">matters</i>
                </h1>
                {/* <p className="font-light text-3xl md:text-4xl lg:text-4xl mb-12 tracking-tight text-white text-center">
                  build consistent routines, align your actions with your goals,
                  and stay accountable.
                </p> */}
              </div>

              <div className="flex mt-15 x-space-4 justify-center">
                <Link
                  href="/signup"
                  className="bg-white text-black mr-4 hover:bg-gray-100/80 py-4 px-11 rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl transition ease-in-out duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/"
                  className="bg-[#222] text-white hover:bg-[#222]/80 py-4 px-11 rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl transition ease-in-out duration-300"
                >
                  Explore Plans
                </Link>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>
        
      <div className="container mb-42">
        <ImageMarquee></ImageMarquee>
      </div>
      {/* KEY FEATURES SECTION */}
      <section className="container flex flex-col justify-center">
        <header className="flex flex-row items-center justify-between w-full">
          <h1 className="font-bold text-6xl ml-20">
            our key <i className="tracking-tighter text-[#520dd0]">features</i>
          </h1>
          <p className="font-light text-xl mr-20 text-gray-300">
            designed to help you stay on track, effortlessly
          </p>
        </header>
        {/* To hold all the cards */}
        <div className="flex flex-wrap justify-center gap-8 items-center p-3 m-20 mt-10 rounded-2xl">
          <div className="p-2 flex flex-col items-center rounded-2xl ">
            {/* NEED TO ADD LINKS LATER ON */}
            <div className="flex flex-row flex-wrap gap-12 items-center justify-center">
              <SpotlightCard className="bg-violet-600/30 border-none" spotlightColor="rgba(255, 255, 255, 0.2)">
                <div className="container bg-[#520dd0] text-white p-2 rounded-xl min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between items-center text-3xl m-3">
                    <i className="fa-solid fa-bell"></i>
                    <p className="font-bold tracking-tighter text-center">
                      Habit Tracker
                    </p>
                  </span>

                  {/* CONTENT */}
                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </SpotlightCard>

              <SpotlightCard className="bg-violet-600/30 border-none" spotlightColor="rgba(255, 255, 255, 0.2)">
                <div className="container bg-[#520dd0] text-white p-2 rounded-xl min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-chart-area"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Goal Board
                    </p>
                  </span>

                  {/* CONTENT */}
                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </SpotlightCard>

              <SpotlightCard className="bg-violet-600/30 border-none" spotlightColor="rgba(255, 255, 255, 0.2)">
                <div className="container bg-[#520dd0] text-white p-2 rounded-xl min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-list-check"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Task Sync
                    </p>
                  </span>

                  {/* CONTENT */}
                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </SpotlightCard>

              <SpotlightCard className="bg-violet-600/30 border-none" spotlightColor="rgba(255, 255, 255, 0.2)">
                <div className="container bg-[#520dd0] text-white p-2 rounded-xl min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Read Route
                    </p>
                  </span>

                  {/* CONTENT */}
                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </SpotlightCard>

              <SpotlightCard className="bg-violet-600/30 border-none" spotlightColor="rgba(255, 255, 255, 0.2)">
                <div className="container bg-[#520dd0] text-white p-2 rounded-xl min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-stopwatch"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Focus Camp
                    </p>
                  </span>

                  {/* CONTENT */}
                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="container flex flex-col justify-center">
        <AnimatedContent
          direction="horizontal"
          reverse={true}
          duration={0.6}
          ease="in"
          animateOpacity
          threshold={0.2}
        >
          <header className="flex items-center justify-center mr-8">
            <h1 className="font-bold text-5xl ml-20">
              How to get <i className="tracking-tighter">started?</i>
            </h1>
          </header>

          <div className="flex flex-row flex-wrap justify-center items-center p-3 m-20 mt-10">
            <SpotlightCard
              className="custom-spotlight-card bg-[#222] m-10 sm:min-h-85 sm:w-82 lg:min-h-100 lg:w-92 text-center cursor-default text-white flex flex-col items-center justify-center"
              spotlightColor="rgba(234, 230, 238, 0.2)"
            >
              <h2 className="text-4xl font-bold mb-3">Step 1: Sign-Up</h2>
              <p>Create an account to join the Corefocus community today</p>
            </SpotlightCard>

            <SpotlightCard
              className="custom-spotlight-card m-10 sm:min-h-85 sm:w-82 md:w-75 lg:min-h-100 lg:w-92 text-center cursor-default text-white flex flex-col items-center justify-center"
              spotlightColor="rgba(234, 230, 238, 0.2)"
            >
              <h2 className="text-4xl font-bold mb-3">
                Step 2: Set Habits & End Goals
              </h2>
              <p>
                Establish long-term and short-term commitments to meet your
                goals
              </p>
            </SpotlightCard>

            <SpotlightCard
              className="custom-spotlight-card m-10 sm:min-h-85 sm:w-82 md:w-75 lg:min-h-100 lg:w-92 text-center cursor-default text-white flex flex-col items-center justify-center"
              spotlightColor="rgba(234, 230, 238, 0.2)"
            >
              <h2 className="text-4xl font-bold mb-3">
                Step 3: Track & Reflect
              </h2>
              <p>
                Regularly check-in to maintain your goals and reflect on wins
                and shortcomings
              </p>
            </SpotlightCard>
          </div>
        </AnimatedContent>
      </section>

      {/* FAQ SECTION  */}
      <section className="container flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between lg:m-16 gap-8">
          <div className="w-75 mr-20">
            <h2 className="text-6xl font-semibold">FAQs</h2>
            <p className="text-2xl font-light">
              Got a different question? Email support@corefocus.ai
            </p>
          </div>

          <div className="w-[70%] max-h-[400px] overflow-y-auto pr-4">
            <FAQItem
              question="How do I create an account?"
              answer="The steps to create an account can be found here."
            />
            <FAQItem
              question="Is Corefocus free for all users?"
              answer="Corefocus has options for everyone, plans can be found here."
            />
            <FAQItem
              question="How is my data managed?"
              answer="Corefocus is in lines with the GDPR 2010, the privacy policy can be found here."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
