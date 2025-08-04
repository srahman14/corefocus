import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"
import toast from "react-hot-toast";

const HabitFrequency = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const difficulties = ["Easy", "Medium", "Hard"]
const categories = ["Positive", "Negative"]
const defaultTags = ["Educational", "Personal", "Physical", "Mental", "Spiritual", "Family-Related", "Developement", "Reading", "Career-Related", "Financial", "Competitive"]

export default function CreateHabitForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [habitName, setHabitName] = useState("")
  const [habitFreq, setHabitFreq] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  const [uid, setUid] = useState(null)
  const [tags, setTags] = useState([]);

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
        const isHabitNameValid = 
            habitName &&
            habitName.length >= 5;

        if (!isHabitNameValid) {
            alert("Please enter a valid habit name(min 5 characters).");
            console.log("Habit name not set")
            return;
        }

        if (HabitFrequency.length === 0) {
            alert("Please select at least one day")
            console.log("Day chose not selected")
            return;
        }

        if (difficulties.length === 0) {
            alert("Please select at least one difficulty")
            console.log("Difficulty not selected")
            return;
        }

        if (category.length === 0) {
            alert("Please select at least one category")
            console.log("Category chose not selected")
            return;
        }

        if (tags.length === 0) {
            alert("Please select at least one tag")
            console.log("Tags chose not selected")
            return;
        }

        // Debug
        // console.log("📨 Attempting to save habit...");
        const toastId = toast.loading("Creating habit...");


        try {
            await addDoc(collection(db, "users", uid, "habits"), {
                habitName: habitName,
                habitFreq: habitFreq,
                difficulty: difficulty,
                category: category,
                tags: tags,
                createdAt: new Date()
            });

            // Debug
            // console.log("✅ Habit successfully saved to Firestore.");
            toast.success("Habit successfully created!", { id: toastId });
        } catch (error) {
            toast.error("Habits failed to save!", { id: toastId });
        }
    };

  return (
    <div className="min-w-[10rem] max-w-[40rem]">
      <h2 className="text-4xl tracking-tighter font-semibold">Create Habit</h2>
      <p className="w-140 font-light text-gray-400 text-lg">Start achieving your goals with achievable habits in place. Note that you should relate your habits to your overall goals.</p>
      <hr className="mb-4 bg-gray-300/90 min-h-1 border-none" />

      {/* Form contents */}
      <form className="flex flex-col space-y-12" onSubmit={handleSubmit}>
        {/* ... all your input fields ... */}
        {/* TAGS, */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start gap-8">
            <div>
              <label className="block text-lg mb-2 font-semibold tracking-tighter">Habit name</label>

              <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                    <i className="fa-solid fa-t text-2xl"></i>
                  </div>


                <div className="flex items-center justify-center bg-blue-300 rounded-lg h-full">
                  <input required value={habitName} onChange={(e) => setHabitName(e.target.value)} placeholder="e.g. Morning run" className="outline-none text-xl font-semibold"></input>
                </div>

               </div>
            </div>

            <div>
              <label className="block text-lg mb-2 font-semibold tracking-tighter">Habit Related Goal</label>
                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                    {/* Icon on the left */}
                    <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                      <i className="fa-solid fa-t text-2xl"></i>
                    </div>

                    <div className="flex items-center bg-blue-300 rounded-lg w-full">
                      <select placeholder="e.g. Morning run" className="w-42 outline-none border-b-2 border-blue-300 text-xl font-semibold">
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                      </select>
                    </div>

                </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Frequency</label>

            <div className="flex flex-wrap  rounded-lg overflow-hidden h-16">
              {/* Icon on the left */}
              <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                <i className="fa-solid fa-calendar-week text-2xl"></i>
              </div>

              {/* Days on the right */}
              <ul className="flex items-center gap-0 justify-start h-full">
                  {HabitFrequency.map((option) => {
                    const isSelected = habitFreq.includes(option);
                    return (
                    <li
                        key={option}
                        onClick={() => handleToggleItem(option, habitFreq, setHabitFreq)}
                            className={`h-full flex items-center px-4 hover:bg-blue-300 cursor-pointer font-semibold tracking-tighter text-md duration-300 ease-in transition-all
                            ${darkMode 
                                ? isSelected 
                                ? "bg-blue-300 text-white" 
                                : "bg-blue-600 text-white hover:bg-gray-700"
                                : isSelected 
                                ? "bg-blue-500 text-white" 
                                : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}>
                        {option}
                    </li>
                    );
                  })}

                  <li 
                  onClick={() => handleToggleAll(HabitFrequency, habitFreq, setHabitFreq)}
                  className={`h-full flex items-center px-4 hover:bg-blue-300 cursor-pointer font-semibold tracking-tighter text-md rounded-r-lg duration-300 ease-in transition-all
                        ${
                        darkMode
                            ? habitFreq.length === HabitFrequency.length
                            ? "bg-blue-300 text-white"
                            : "bg-gray-600 text-white hover:bg-gray-700"
                            : habitFreq.length === HabitFrequency.length
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }
                    `}
                  >
                  {habitFreq.length === HabitFrequency.length ? "All" : "All"}
                  </li>
              </ul>
            </div>
          </div>
        
          <div className="flex flex-row justify-start gap-8">
            <div>
                <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Difficulty</label>

                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                {/* Icon on the left */}
                <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                  <i className="fa-solid fa-cubes-stacked text-2xl"></i>
                </div>

                {/* Days on the right */}
                <ul className="flex items-center gap-0 justify-start h-full">
                  {difficulties.map((level) => {
                    const isSelected = difficulty === level;

                    const bgClass = {
                      Easy: isSelected ? "bg-green-400": "bg-green-200 hover:bg-green-300",
                      Medium: isSelected ? "bg-orange-400" : "bg-orange-200 hover:bg-orange-300",
                      Hard: isSelected ? "bg-red-400" : "bg-red-200 hover:bg-red-300"
                    }[level];

                    return (
                      <li
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`h-full flex items-center px-4 cursor-pointer font-semibold tracking-tighter text-md ${bgClass}`}
                      >
                        {level}
                      </li>

                    )
                  })}
                </ul>
              </div>
            </div>

            <div>
                <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Category</label>

                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                {/* Icon on the left */}
                {/* ICON CHANGES BASED ON INPUT */}
                <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                  <i className="fa-solid fa-face-grin text-2xl"></i>
                </div>

                {/* Days on the right */}
                <ul className="flex items-center gap-0 justify-start h-full">
                  {categories.map((type) => {
                    const isSelected = category === type;
                    
                    const bgClass = type === "Positive"
                      ? isSelected ? "bg-green-400" : "bg-green-200 hover:bg-green-300"
                      : isSelected ? "bg-red-400" : "bg-red-200 hover:bg-red-300";

                      return (
                        <li
                          key={type}
                          onClick={() => setCategory(type)}
                          className={`h-full flex items-center px-4 cursor-pointer font-semibold tracking-tighter text-md ${bgClass}`}
                        >
                          {type}
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-4">Habit Tags</label>
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
                {tags.length === defaultTags.length ? "All" : "All"}
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
