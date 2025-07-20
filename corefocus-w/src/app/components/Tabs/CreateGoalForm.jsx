import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const defaultTags = ["Educational", "Personal", "Physical", "Mental", "Spiritual", "Family-Related", "Developement", "Reading", "Career-Related", "Financial", "Competitive"]

export default function CreateHabitForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalMotivation, setGoalMotivation] = useState("");
  const [uid, setUid] = useState(null);
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(null);

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
            console.log("Goal name not set")
            return;
        }
        
        if (startDate === null) {
          alert("Please select a date (deadline for your goal)");
          console.log("Date not set")
          return;
        }

        if (tags.length === 0) {
            alert("Please select at least one tag")
            console.log("Tags chose not selected")
            return;
        }

        // Debug
        // console.log("📨 Attempting to save habit...");


        try {
            await addDoc(collection(db, "users", uid, "goals"), {
                goalName: goalName,
                goalMotivation: goalMotivation,
                startDate: startDate,
                tags: tags,
                createdAt: new Date()
            });

            // Debugs
            // console.log("✅ Habit successfully saved to Firestore.");
            alert("Goal saved successfully!");
        } catch (error) {
            console.log("Error saving data", error)
        }
    };

  return (
    <div className="min-w-[10rem] max-w-[40rem]">
      <h2 className="text-4xl tracking-tighter font-semibold">Create Goal</h2>
      <p className="w-140 font-light text-gray-400 text-lg">Establish your long-term goals here which you will therby achieve with habits set in place.</p>
      <hr className="mb-4 bg-gray-300/90 min-h-1 border-none" />

      {/* Form contents */}
      <form className="flex flex-col space-y-12 transition-all duration-500 ease-in-out" onSubmit={handleSubmit}>
        {/* ... all your input fields ... */}
        {/* TAGS, */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start gap-8">
            <div className="w-full">
              <label className="text-lg mb-2 font-semibold tracking-tighter block">Goal name, <span className="font-light italic">what do you want to achieve in the long-term?</span></label>

              <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                    <i className="fa-solid fa-t text-2xl"></i>
                  </div>
              

                <div className="flex items-center justify-center bg-blue-300 rounded-lg h-full">
                  <input required value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="e.g. Read 6 books this year" className="outline-none text-xl font-semibold"></input>
                </div>

               </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-2">Goal Deadline, <span className="font-light italic">I want to achieve {goalName.toLowerCase()} by?</span></label>

            <div className="flex flex-wrap rounded-lg overflow-hidden">
              {/* Icon on the left */}
              <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                <i className="fa-solid fa-calendar-week text-2xl"></i>
              </div>

              <div className="w-8/9 p-8 flex items-center justify-center bg-blue-300 rounded-r-lg h-full font-semibold">
                    <DayPicker
                    classNames={{
                      today: `bg-blue-200 rounded-full`, // Add a border to today's date
                      selected: `bg-blue-500 rounded-full border-blue-500 text-white`, // Highlight the selected day
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

          <div className="flex flex-row justify-start gap-8">
            <div className="w-full">
              <label className="text-lg mb-2 font-semibold tracking-tighter block">Goal motivation, <span className="font-light italic">why is this important to you?</span></label>

              <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                    <i className="fa-solid fa-t text-2xl"></i>
                  </div>

                <div className="flex items-center justify-center bg-blue-300 rounded-lg h-full">
                  <input required value={goalMotivation} onChange={(e) => setGoalMotivation(e.target.value)} placeholder="e.g I want to gain more knowledge" className="outline-none text-xl font-semibold"></input>
                </div>

               </div>
            </div>
          </div>


          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-4">Tags</label>
              <div className="flex rounded-lg h-16">

              <ul className="flex flex-wrap items-center gap-2 justify-start p-1">

                {defaultTags.map((tagTypes) => {
                  const isSelected = tags.includes(tagTypes);

                  const bgClass = tagTypes
                      ? isSelected ? "bg-blue-300" : "bg-gray-200 hover:bg-gray-300"
                      : isSelected ? "bg-red-400" : "bg-red-200 hover:bg-red-300";
                  
                  return (
                    <li 
                      key={tagTypes}
                      onClick={() => handleToggleItem(tagTypes, tags, setTags)}
                      className={`p-2 cursor-pointer font-semibold text-sm rounded-lg duration-300 ease-in transition-all ${bgClass}`}
                    >
                      {tagTypes}
                    </li>
                  )
                })}

                
                <li 
                onClick={() => handleToggleAll(defaultTags, tags, setTags)}
                className={`p-2 cursor-pointer font-semibold text-sm rounded-lg duration-300 ease-in transition-all
                      ${
                      darkMode
                          ? tags.length === defaultTags.length
                          ? "bg-blue-300 text-white"
                          : "bg-gray-600 text-white hover:bg-gray-700"
                          : tags.length === defaultTags.length
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }
                  `}
                >
                All
                </li>
              </ul>
            </div>
          </div>

          
          
        </div>
        <div className="flex flex-row justify-between items-center mt-12">
          <p className="text-sm text-gray-400">ESC to close</p>
          <button
            type="submit"
            className="w-46 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition-all cursor-pointer "
          >
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}
