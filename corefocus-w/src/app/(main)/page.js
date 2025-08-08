"use client";

import Magnet from "../components/Magnet";
import SpotlightCard from "../components/SpotlightCard";
import AnimatedContent from "../components/AnimatedContent";
import ImageMarquee from "../components/ReactMarquee";
import FAQItem from "../components/FAQComponent";
import DarkVeil from "../components/ui/DarkVeil";
import Link from "next/link";
import { useThemeStore } from "../store/useThemeStore";
import { useState, useEffect, useRef} from "react";

export default function Home() {
  const { isDark, toggleTheme } = useThemeStore();
   const features = [
    {
      icon: "fa-solid fa-bell",
      title: "Habit Tracker",
      tagline: "Track your streaks and progress with ease.",
      details: [
        "Keep up with streaks for each day you complete",
        "Heatmaps for day, week, month, and year",
        "View custom analytics to track your progress",
      ],
    },
    {
      icon: "fa-solid fa-chart-area",
      title: "Goal Board",
      tagline: "Visualize and manage your goals clearly.",
      details: [
        "Set monthly and yearly goals",
        "Track progress visually",
        "Reflect and adjust your strategies",
      ],
    },
    {
      icon: "fa-solid fa-list-check",
      title: "Task Sync",
      tagline: "Sync your tasks seamlessly.",
      details: [
        "Sync with external calendars",
        "Real-time updating",
        "Integrate your workflow easily",
      ],
    },
    {
      icon: "fa-solid fa-pen-to-square",
      title: "Read Route",
      tagline: "Journal your reflections and insights.",
      details: [
        "Create rich text journals",
        "Track reading habits",
        "Review past entries anytime",
      ],
    },
    {
      icon: "fa-solid fa-stopwatch",
      title: "Focus Camp",
      tagline: "Boost productivity with focused sessions.",
      details: [
        "Set timers for work intervals",
        "Track session counts",
        "Analyze focus trends over time",
      ],
    },
  ];
  
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
                  className="mr-4 rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl transition ease-in-out duration-300 inline-block bg-[#520dd0] hover:bg-[#7c53ff] transition-colors duration-300 text-white font-semibold text-xl px-12 py-4 shadow-xl shadow-[#520dd0]/40"
                >
                  Get Started
                </Link>
                <Link
                  href="/"
                  className="rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl transition ease-in-out duration-300 inline-block bg-[#222] hover:bg-[#222]/80 transition-colors duration-300 text-white font-semibold text-xl px-12 py-4 shadow-lg shadow-[#fff]/20"
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
      <section className="container flex flex-col justify-center px-8 py-16">
        <header className="flex flex-row items-center justify-between w-full mb-12 px-4">
          <h1 className="font-bold text-6xl">
            our key <i className="tracking-tighter text-[#520dd0]">features</i>
          </h1>
          <p className="font-light text-xl text-gray-300 max-w-md">
            Designed to help you stay on track, effortlessly
          </p>
        </header>

    <div className="w-full  px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">

        {/* Feature Row */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-light tracking-widest">TRACKING HABITS</h3>
            <h2 className="text-3xl font-bold text-white mb-4">
              Track Your Habits Easily
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Stay consistent with daily tracking of your habits. <br></br>
              Your habits are automatically synced across all devices in real-time. <br></br>
              View and learn from your progress with analytics and heatmaps for all-time activity. <br></br>
              

            </p>
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition">
              Learn More
            </button>
          </div>

          {/* Right Content with Gradient Border */}
          <div className="flex-1 flex justify-center">
            <div className="pl-[0] pb-[0] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden">
                <img
                  src="/habit_tracker.png"
                  alt="Dashboard preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Row */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-light tracking-widest">TRACKING HABITS</h3>
            <h2 className="text-3xl font-bold text-white mb-4">
              Track Your Habits Easily
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Stay consistent with daily tracking of your habits. <br></br>
              Your habits are automatically synced across all devices in real-time. <br></br>
              View and learn from your progress with analytics and heatmaps for all-time activity. <br></br>
              

            </p>
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition">
              Learn More
            </button>
          </div>

          {/* Right Content with Gradient Border */}
          <div className="flex-1 flex justify-center">
            <div className="pl-[0] pb-[0] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden">
                <img
                  src="/habit_tracker.png"
                  alt="Dashboard preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Row */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-light tracking-widest">TRACKING HABITS</h3>
            <h2 className="text-3xl font-bold text-white mb-4">
              Track Your Habits Easily
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Stay consistent with daily tracking of your habits. <br></br>
              Your habits are automatically synced across all devices in real-time. <br></br>
              View and learn from your progress with analytics and heatmaps for all-time activity. <br></br>
              

            </p>
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition">
              Learn More
            </button>
          </div>

          {/* Right Content with Gradient Border */}
          <div className="flex-1 flex justify-center">
            <div className="pl-[0] pb-[0] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden">
                <img
                  src="/habit_tracker.png"
                  alt="Dashboard preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* <div className="flex flex-wrap justify-center gap-10">
          {features.map(({ icon, title, tagline, details }) => (
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              tagline={tagline}
              details={details}
            />
          ))}
        </div> */}
      </section>

      {/* HOW IT WORKS SECTION */}
      {/* <section className="container flex flex-col justify-center">
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
      </section> */}

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

      <footer className="w-full mt-40 mb-40 flex justify-center">
        <div
          className="rounded-3xl px-12 py-16 max-w-6xl w-full text-white"
          style={{
            background: "linear-gradient(to bottom, #1a0e3f, #520dd0)",
            boxShadow: "0 8px 24px rgba(82, 13, 208, 0.5)",
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl font-bold text-center">Ready to <span className="text-[#fff]">begin?</span></h1>
            <p className="text-white/70 max-w-sm text-center text-lg px-4">Start your journey towards mastering your habits, take the first step today!</p>
            <button className="rounded-4xl font-semibold tracking-tighter text-xl md:text-2xl transition ease-in-out duration-300 inline-block bg-[#222] hover:bg-[#222]/80 transition-colors duration-300 text-white font-semibold text-xl px-12 py-4 shadow-lg shadow-[#fff]/10 cursor-pointer">
              Get started now
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, tagline, details }) {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (!detailsRef.current) return;

    if (expanded) {
      detailsRef.current.style.maxHeight = `${detailsRef.current.scrollHeight}px`;
    } else {
      detailsRef.current.style.maxHeight = "0px";
    }
  }, [expanded]);

  return (
    <SpotlightCard
      className="bg-violet-600/60 border-none p-8 rounded-xl w-72 flex flex-col cursor-pointer"
      spotlightColor="rgba(255, 255, 255, 0.2)"

    >
      <div className="flex flex-col items-center text-white flex-grow  p-2 rounded-xl"

      onClick={() => setExpanded((prev) => !prev)}
      aria-expanded={expanded}
      aria-controls={`${title}-details`}
      >
        <i className={`${icon} text-5xl mb-4`} aria-hidden="true"></i>
        <h3 className="font-bold text-2xl mb-2">{title}</h3>
        <p className="text-lg font-light text-center">{tagline}</p>

        {/* Animated details container */}
        <div
          ref={detailsRef}
          id={`${title}-details`}
          style={{
            maxHeight: "0px",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
            width: "100%",
          }}
          className="mt-4 ml-6 text-white font-semibold text-base list-disc text-left"
        >
          <ul>
            {details.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}