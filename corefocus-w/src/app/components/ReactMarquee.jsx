import Marquee from "react-fast-marquee";

const cards = [
  {
    title: "Habit Tracker",
    description: "Track your daily habits like Salah, Qur’an, workouts, and sleep — all in one clean dashboard.",
    icon: <i className="fa-solid fa-bell h-[16px] w-[16px] text-black" />,
  },
  {
    title: "GoalBoard",
    description: "Set and reflect on your monthly and yearly goals. Build discipline with intentional planning.",
    icon: <i className="fa-solid fa-chart-area h-[16px] w-[16px] text-black" />,
  },
  {
    title: "TaskSync",
    description: "Integrate with your calendar to sync daily to-dos and spiritual goals effortlessly.",
    icon: <i className="fa-solid fa-list-check h-[16px] w-[16px] text-black" />,
  },
  {
    title: "ReadRoute",
    description: "Capture insights from your readings and reflections with our minimal journaling system.",
    icon: <i className="fa-solid fa-pen-to-square h-[16px] w-[16px] text-black" />,
  },
  {
    title: "FocusCamp",
    description: "Use a goal-based timer to stay focused during Qur’an study, workouts, or deep work.",
    icon: <i className="fa-solid fa-stopwatch h-[16px] w-[16px] text-black" />,
  },
];

export default function ImageMarquee() {
  return (
    <Marquee gradient={false} speed={40}>
      {[...cards, ...cards].map((card, idx) => (
        <div
          key={idx}
          className="flex flex-col cursor-pointer items-center justify-center text-center bg-white rounded-lg p-4 mx-4 w-52 h-55"
        >
          <div className="text-green-600 text-4xl mb-2 mr-4">{card.icon}</div>
          {/* THESE H3s WILL BECOME LINKS IN THE FUTURE, THE LINK WILL BE ADDED TO CARDS LIST */}
          <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
        </div>
      ))}
    </Marquee>
  );
}
