"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore"
import Stepper, { Step } from "@/app/components/Stepper";
import { useRouter } from "next/navigation";

export default function Steps() {
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState("");
    const [qualifications, setQualifications] = useState([]);
    const [achieve, setAchieve] = useState([]);
    const [overallGoal, setOverallGoal] = useState("");
    const [uid, setUid] = useState(null)
    const [usernameError, setUsernameError] = useState("");
    const { currentUser, loading, userData } = useAuth(); 

    const router = useRouter();

    useEffect(() => {
    if (!loading && !currentUser) {
        console.log("User not logged in, redirecting");
        router.push("/");
    } 

    if (currentUser && userData) {
        if (userData.completedSteps === true) {
            router.push("/dashboard")
        }
    }
    
    }, [loading, currentUser, userData, router]);


    useEffect(() => {
    if (username.length === 0) {
        setUsernameError("");
        return;
    }

    if (username.length < 5) {
        setUsernameError("Username must be at least 5 characters.");
    } else if (username.includes(" ")) {
        setUsernameError("Username cannot contain spaces.");
    } else if (/[@#$%^&*(),.?!":{}|<>]/.test(username)) {
        setUsernameError("Username cannot contain special characters.");
    } else {
        setUsernameError("");
    }
    }, [username]);


    const validateUsername = (value) => {
        setUsername(value);

        if (value.includes(" ")) {
            setUsernameError("Username must not contain spaces");
        } else if (value.length < 5) {
            setUsernameError("Password requires 5 characters minimum");
        } else if (/[@#$%^&*(),.?!":{}|<>]/.test(value)) {
            setUsernameError("Username cannot contain special characters except underscore and dash");
        } else if (value === "") {
            setUsernameError("Username cannot be empty");
        } else {
            setUsernameError("");
        }
    };


    const qualificationsOptions = [
        "GCSEs",
        "A-Levels",
        "Bachelorates",
        "Masters",
        "Doctorates",
        "Chartership",
        "Apprenticeship",
        "Internship",
        ];
    
    const goalOptions = [
        "Consistency",
        "Focus",
        "Discipline",
        "Routine",
        "Track habits",
        "Achieve goals",
        "Build habits",
        ];
    
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

    const handleSubmit = async () => {
        const isUsernameValid = 
            username &&
            username.length >= 5 &&
            !username.includes(" ") &&
            !/[@#$%^&*(),.?!":{}|<>]/.test(username);

        if (!isUsernameValid) {
            setUsernameError("Please enter a valid username (min 5 characters, no spaces/symbols).");
            console.log("Username not valid")
            return;
        }

        if (qualifications.length === 0) {
            alert("Please select at least one qualification")
            console.log("Qualifications not valid")
            return;
        }

        if (achieve.length === 0) {
            alert("Please select at least one achievement")
            console.log("Achievements not valid")
            return;
        }

        try {
            await setDoc(doc(db, "users", currentUser.uid), {
                username: username,
                qualifications, qualifications,
                achieve: achieve,
                overallGoal, overallGoal,
                completedSteps: true,
            });
            console.log("User data saved!");
            router.push("/dashboard")
        } catch (error) {
            console.log("Error saving data", error)
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    return (
    <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>        
        {/* DARK MODE TOGGLE */}
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
        >
            {darkMode ? <i className="fa-solid fa-sun fa-fade"></i> : <i className="fa-solid fa-moon fa-fade"></i>}
        </button>
        <section className="w-full text-white flex flex-col justify-between items-center">  
            <div className={`container transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
>
                <Stepper
                    initialStep={1}
                    onFinalStepCompleted={handleSubmit}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                <Step>
                    <h2 className="font-bold">Welcome to <i>CoreFocus</i>!</h2>
                    <p className="text-gray-500">Follow the profile setup to get started...</p>
                </Step>
                <Step>
                    <h2 className="font-bold">Enter your username</h2>
                    <input required value={username} onChange={(e) => validateUsername(e.target.value)} placeholder="Your name?" className="font-bold italic text-gray-300 mt-3 outline-none"/>
                    {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    
                </Step>
                <Step>
                    <h2 className="font-bold">What qualifications apply to you?</h2>
                    <p className="text-gray-500">Select all that apply</p>
                
                    <ul className="flex flex-row flex-wrap gap-2 mt-2 transition-colors duration-500">
                    {qualificationsOptions.map((option) => {
                        const isSelected = qualifications.includes(option);
                        return (
                        <li
                            key={option}
                            onClick={() => handleToggleItem(option, qualifications, setQualifications)}
                            className={`cursor-pointer p-1 px-3 rounded-lg font-semibold transition-colors duration-300 ease-in
                            ${darkMode 
                                ? isSelected 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-600 text-white hover:bg-gray-700"
                                : isSelected 
                                ? "bg-blue-200 text-black" 
                                : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {option}
                        </li>
                        

                    );
                    })}

                    <li
                    onClick={() => handleToggleAll(qualificationsOptions, qualifications, setQualifications)}
                    className={`cursor-pointer p-1 px-3 rounded-lg font-semibold transition-colors duration-500 ease-in-out
                        ${
                        darkMode
                            ? qualifications.length === qualificationsOptions.length
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-white hover:bg-gray-700"
                            : qualifications.length === qualificationsOptions.length
                            ? "bg-blue-200 text-black"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }
                    `}
                    >
                    {qualifications.length === qualificationsOptions.length ? "Unselect All" : "All of the above"}
                    </li>
                    </ul>
                </Step>
                <Step>
                    <h2 className="font-bold w-90">Tell us more about what you want to achieve using CoreFocus?</h2>
                    <p className="text-gray-500">Select all that apply</p>
                    <ul className="flex flex-row flex-wrap gap-2 mt-2 transition-colors duration-500">
                    {goalOptions.map((option) => {
                        const isSelected = achieve.includes(option);
                        return (
                        <li
                            key={option}
                            onClick={() => handleToggleItem(option, achieve, setAchieve)}
                            className={`cursor-pointer p-1 px-3 rounded-lg font-semibold transition-colors duration-300 ease-in
                            ${darkMode 
                                ? isSelected 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-600 text-white hover:bg-gray-700"
                                : isSelected 
                                ? "bg-blue-200 text-black" 
                                : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {option}
                        </li>
                        );
                    })}
                    <li
                    onClick={() => handleToggleAll(goalOptions, achieve, setAchieve)}
                    className={`cursor-pointer p-1 px-3 rounded-lg font-semibold transition-colors duration-500 ease-in-out
                        ${
                        darkMode
                            ? achieve.length === goalOptions.length
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-white hover:bg-gray-700"
                            : achieve.length === goalOptions.length
                            ? "bg-blue-200 text-black"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }
                    `}
                    >
                    {achieve.length === goalOptions.length ? "Unselect All" : "All of the above"}
                    </li>
                    </ul>
                </Step>
                <Step>
                    <h2 className="font-bold">Write down your overall goal</h2>
                    <p className="text-gray-500">If you had to write only one goal down, what would it be...</p>
                    <input className="text-gray-300 font-bold italic mt-3 outline-none" value={overallGoal} onChange={(e) => setOverallGoal(e.target.value)} placeholder="Your goal?"  />
                </Step>
                <Step>
                    <span>
                        <h2 className="inline font-bold mr-2">Congrats, you're one step closer to achieving your goals </h2>
                        <i className="fa-sharp fa-solid fa-leaf fa-fade"></i>
                    </span>
                </Step>
                </Stepper>
            </div>
        </section>
        </main>

 );
}
