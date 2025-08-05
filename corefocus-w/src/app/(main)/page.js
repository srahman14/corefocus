"use client";

import Magnet from "../components/Magnet";
import SpotlightCard from "../components/SpotlightCard";
import AnimatedContent from "../components/AnimatedContent";
import ImageMarquee from "../components/ReactMarquee";
import FAQItem from "../components/FAQComponent";
import DarkVeil from "../components/ui/DarkVeil";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col flex-wrap items-center justify-center">
      {/* HERO SECTION */}
      <section className="w-full h-220 flex flex-col justify-center items-center mb-32 mt-70 p-16">
        <AnimatedContent
          direction="horizontal"
          reverse={true}
          duration={0.6}
          ease="in"
          animateOpacity
          threshold={0.2}
        >
          <div className="flex items-center justify-center text-center flex-row gap-30">
            <div
              className="p-17 rounded-lg"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
                `,
                backgroundSize: "45px 45px",
              }}
            >
              <div>
                <h1 className="font-bold text-left text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tighter max-w-200">
                  Master your{" "}
                  <i className="underline decoration-sky-500">habits</i> <br />{" "}
                  Achieve what{" "}
                  <i className="underline decoration-sky-500">matters</i>
                </h1>
                <p className="font-light text-3xl md:text-4xl lg:text-5xl mb-12 tracking-tight text-gray-500 w-120 text-left">
                  Build consistent routines, align your actions with your goals,
                  and stay accountable.
                </p>
              </div>

              <div className="flex mt-30 x-space-4 justify-start">
                <Link
                  href="/signup"
                  className="bg-[#222] text-white mr-4 hover:bg-[#222]/90 p-5 rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl"
                >
                  Get Started
                </Link>
                <Link
                  href="/"
                  className="bg-[#222] text-white hover:bg-[#222]/90 p-5 rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl"
                >
                  Explore Plans
                </Link>
              </div>
            </div>
            <img
              src="/asset_6.png"
              className="hidden lg:block w-[30rem] h-[30rem] rounded-3xl"
            ></img>
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
            Explore our key <i className="tracking-tighter">features</i>
          </h1>
          <p className="font-light text-xl mr-20">
            Designed to help you stay on track, effortlessly
          </p>
        </header>
        {/* To hold all the cards */}
        <div className="flex flex-wrap justify-center gap-8 items-center p-3 m-20 mt-10 rounded-2xl">
          <div className="p-2 flex flex-col items-center rounded-2xl ">
            {/* NEED TO ADD LINKS LATER ON */}
            <div className="flex flex-row flex-wrap gap-12 items-center justify-center">
              <Magnet padding={50} disabled={false} magnetStrength={13}>
                <div className="container bg-[#222] text-white p-2 rounded-lg min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between items-center text-3xl m-3">
                    <p className="font-bold tracking-tighter text-center">
                      Habit Tracker
                    </p>
                    <i className="fa-solid fa-bell"></i>
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
              </Magnet>

              <Magnet padding={50} disabled={false} magnetStrength={13}>
                <div className="container bg-[#222] text-white p-2 rounded-lg min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-chart-area"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Goal Board
                    </p>
                  </span>

                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </Magnet>

              <Magnet padding={50} disabled={false} magnetStrength={13}>
                <div className="container bg-[#222] text-white p-2 rounded-lg min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-list-check"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Task Sync
                    </p>
                  </span>

                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </Magnet>

              <Magnet padding={50} disabled={false} magnetStrength={13}>
                <div className="container bg-[#222] text-white p-2 rounded-lg min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Read Route
                    </p>
                  </span>

                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </Magnet>

              <Magnet padding={50} disabled={false} magnetStrength={13}>
                <div className="container bg-[#222] text-white p-2 rounded-lg min-h-100 max-w-90 cursor-default">
                  <span className="flex justify-between m-3 items-center text-3xl">
                    <i className="fa-solid fa-stopwatch"></i>
                    <p className="font-bold p-3 cursor-pointer tracking-tighter text-center">
                      Focus Camp
                    </p>
                  </span>

                  <p className="m-3 text-white font-semibold text-xl tracking-tight">
                    Keep up to your habits and goals with our custom dashboard
                  </p>
                  <ul className="ml-9 text-white font-semibold text-xl tracking-tight list-disc">
                    <li>Keep up with streaks for each day you complete</li>
                    <li>Heatmaps for day, week, month and year</li>
                    <li>View custom analytics to track your progress</li>
                  </ul>
                </div>
              </Magnet>
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
