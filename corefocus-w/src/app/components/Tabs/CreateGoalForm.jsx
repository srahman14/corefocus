import { useEffect, useState, useRef } from "react";
import { db } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import toast from "react-hot-toast";

const defaultTags = ["Educational", "Personal", "Physical", "Mental", "Spiritual", "Family-Related", "Developement", "Reading", "Career-Related", "Financial", "Competitive"]

export default function CreateHabitForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalMotivation, setGoalMotivation] = useState("");
  const [goalPriority, setGoalPriority] = useState(null);
  const [uid, setUid] = useState(null);
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const notificationSound = useRef(null);
  const priority = ["Low", "Medium", "High"]
  useEffect(() => {
      const auth = getAuth();
      console.log("auth.currentUser UID:", auth.currentUser?.uid);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              setUid(user.uid);
          } else {
              console.log("No user detected in onAuthStateChanged");
          }
      });

      return () => unsubscribe();
  }, []);

    const handleToggleItem = (item, stateArray, setStateFn) => {
        if (!Array.isArray(stateArray) || typeof setStateFn !== "function") {
            console.error("Invalid arguments passed to handleToggleItem");
            return;
        }

        if (stateArray.includes(item)) {
            setStateFn(stateArray.filter((i) => i !== item));
        } else {
            setStateFn([...stateArray, item]);
        }
        };

    const handleToggleAll = (optionsArray, stateArray, setStateFn) => {
        const allSelected = optionsArray.every(option => stateArray.includes(option));

        if (allSelected) {
            setStateFn([]);
        } else {
            setStateFn(optionsArray);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Updating goals...");

        if (!uid) {
            console.log("User not auth");
            return;
        } 
        // Final Validation
        const isGoalnameValid = 
            goalName &&
            goalName.length >= 5;

        if (!isGoalnameValid) {
            alert("Please enter a valid goal name (min 5 characters).");
            toast.error("Goal name not set")
            return;
        }
        
        if (startDate === null) {
          alert("Please select a date (deadline for your goal)");
          toast.error("Deadline date not chosen")
          return;
        }

        if (tags.length === 0) {
            toast.error("At least choose one tag")
            return;
        }

        // Debug
        // console.log("📨 Attempting to save habit...");


        try {
            await addDoc(collection(db, "users", uid, "goals"), {
                goalName: goalName,
                goalMotivation: goalMotivation,
                deadline: startDate,
                goalPriority: goalPriority,
                tags: tags,
                createdAt: new Date()
            });

            // Debugs
            // console.log("✅ Habit successfully saved to Firestore.");
            notificationSound.current?.play();
            toast.success("Added goal successfully", { id: toastId})
        } catch (error) {
            toast.error("Failed to add goal", { id: toastId})

        }
    };

  return (
    <div className="min-w-[10rem] max-w-[40rem] w-full">
      <audio ref={notificationSound} src="/sounds/notification.mp3" preload="auto" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tighter font-semibold">Create Goal</h2>
      <p className="font-light text-gray-400 text-sm sm:text-base md:text-lg">Establish your long-term goals here which you will therby achieve with habits set in place.</p>
      <hr className="mb-3 sm:mb-4 bg-gray-300/90 min-h-1 border-none" />

      {/* Form contents */}
      <form className="flex flex-col space-y-6 sm:space-y-8 md:space-y-12 transition-all duration-500 ease-in-out" onSubmit={handleSubmit}>
        {/* ... all your input fields ... */}
        {/* TAGS, */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-8">
            <div className="w-full">
              <label className="text-sm sm:text-base md:text-lg mb-2 font-semibold tracking-tighter block">Goal name, <span className="font-light italic text-xs sm:text-sm">what do you want to achieve in the long-term?</span></label>

              <div className="flex dark:bg-[#520dd0] rounded-lg overflow-hidden h-12 sm:h-14 md:h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-3 sm:px-4 md:px-6 dark:bg-[#520dd0] bg-[#bda3f0] text-white">
                    <i className="fa-solid fa-t text-lg sm:text-xl md:text-2xl"></i>
                  </div>
              

                <div className="flex items-center justify-center dark:bg-violet-900/20 rounded-lg h-full flex-1">
                  <input required value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="e.g. Read 6 books this year" className="outline-none text-sm sm:text-base md:text-xl font-semibold w-full px-2"></input>
                </div>

               </div>
            </div>
          </div>

          <div>
            <label className="block text-sm sm:text-base md:text-lg font-semibold tracking-tighter mb-2">Goal Deadline, <span className="font-light italic text-xs sm:text-sm">I want to achieve {goalName.toLowerCase()} by?</span></label>

            <div className="flex flex-wrap rounded-lg overflow-hidden">
              {/* Icon on the left */}
              <div className="flex items-center justify-center px-3 sm:px-4 md:px-6 dark:bg-[#520dd0] bg-[#bda3f0] text-white w-full py-2">
                <i className="fa-solid fa-calendar-week text-lg sm:text-xl md:text-2xl"></i>
              </div>

              <div className="w-full p-2 sm:p-4 md:p-8 flex items-center justify-center dark:bg-violet-900/20 rounded-r-lg h-full font-semibold text-sm overflow-x-auto">
                    <DayPicker
                    classNames={{
                      button_next: `bg-white rounded-xl`,
                      button_previous: `bg-white rounded-xl mr-2 fg-white`,
                      today: `bg-gray-400/10 text-white rounded-full`, // Add a border to today's date
                      selected: `bg-white rounded-full text-black`, // Highlight the selected day
                    }}
                    animate
                    mode="single"
                    showWeekNumber
                    selected={startDate}
                    onSelect={setStartDate}
                    footer={
                      startDate ? `Selected: ${startDate.toLocaleDateString()}` : "Pick a day"
                    }
                  />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 md:gap-8">
            <div className="w-full">
              <label className="text-sm sm:text-base md:text-lg mb-2 font-semibold tracking-tighter block">Goal motivation, <span className="font-light italic text-xs sm:text-sm">why is this important to you?</span></label>

              <div className="flex dark:bg-[#520dd0] rounded-lg overflow-hidden h-12 sm:h-14 md:h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-3 sm:px-4 md:px-6 dark:bg-[#520dd0] bg-[#bda3f0] text-white">
                    <i className="fa-solid fa-t text-lg sm:text-xl md:text-2xl"></i>
                  </div>

                <div className="flex items-center justify-center dark:bg-violet-900/20 rounded-lg h-full flex-1">
                  <input required value={goalMotivation} onChange={(e) => setGoalMotivation(e.target.value)} placeholder="e.g I want to gain more knowledge" className="outline-none text-sm sm:text-base md:text-xl font-semibold w-full px-2"></input>
                </div>

               </div>
            </div>

              <div className="flex-1">
                <label className="block text-sm sm:text-base md:text-lg font-semibold tracking-tighter mb-2">Goal Priority</label>


                <div className="flex  rounded-lg overflow-x-auto h-12 sm:h-14 md:h-16">
                {/* Icon on the left */}
                <div className="flex items-center justify-center px-3 sm:px-4 md:px-6 dark:bg-[#520dd0] bg-[#bda3f0] text-white flex-shrink-0">
                  <i className="fa-solid fa-cubes-stacked text-lg sm:text-xl md:text-2xl"></i>
                </div>

                {/* Days on the right */}
                <ul className="flex items-center gap-0 justify-start h-full shrink-0">
                  {priority.map((level) => {
                    const isSelected = goalPriority === level;

                    const bgClass = {
                      Low: isSelected ? "bg-green-400": "bg-green-200 hover:bg-green-300",
                      Medium: isSelected ? "bg-orange-400" : "bg-orange-200 hover:bg-orange-300",
                      High: isSelected ? "bg-red-400" : "bg-red-200 hover:bg-red-300 rounded-r-xl"
                    }[level];

                    return (
                      <li
                        key={level}
                        onClick={() => setGoalPriority(level)}
                        className={`h-full text-black flex items-center px-8 md:px-4 cursor-pointer font-semibold tracking-tighter text-xs sm:text-sm md:text-md ${bgClass}`}
                      >
                        {level}
                      </li>

                    )
                  })}
                </ul>
              </div>
            </div>
          </div>


          <div>
            <label className="block text-sm sm:text-base md:text-lg font-semibold tracking-tighter mb-2 sm:mb-3 md:mb-4">Tags</label>
              <div className="flex rounded-lg">

              <ul className="flex flex-wrap items-center gap-1 sm:gap-2 justify-start p-1">

                {defaultTags.map((tagTypes) => {
                  const isSelected = tags.includes(tagTypes);

                  const bgClass = tagTypes
                      ? isSelected ? "dark:bg-[#520dd0] bg-[#bda3f0]" : "bg-gray-200 dark:bg-gray-600/30 hover:bg-gray-300"
                      : isSelected ? "bg-red-400" : "bg-red-200 hover:bg-red-300";
                  
                  return (
                    <li 
                      key={tagTypes}
                      onClick={() => handleToggleItem(tagTypes, tags, setTags)}
                      className={`p-1 sm:p-2 cursor-pointer font-semibold text-xs sm:text-sm rounded-lg duration-300 ease-in transition-all ${bgClass}`}
                    >
                      {tagTypes}
                    </li>
                  )
                })}

                
                <li 
                onClick={() => handleToggleAll(defaultTags, tags, setTags)}
                className={`p-1 sm:p-2 cursor-pointer font-semibold text-xs sm:text-sm rounded-lg duration-300 ease-in transition-all
       
      ? tags.length === defaultTags.length
                          ? "bg-gray-300 dark:bg-gray-600/30 text-white"
                          : "dark:bg-[#520dd0] bg-[#bda3f0] text-white hover:bg-gray-700"
        
                      
                  `}
                >
                All
                </li>
              </ul>
            </div>
          </div>

          
          
        </div>
        <div className="flex flex-row justify-between items-center mt-6 sm:mt-8 md:mt-12 gap-2">
          <p className="text-xs sm:text-sm text-gray-400">ESC to close</p>
          <button
            type="submit"
            className="px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all cursor-pointer whitespace-nowrap"
          >
            Save Goal
          </button>
        </div>
      </form>
    </div>
  );
}
