"use client";

import React, { useState } from "react";
import { auth } from "@/app/firebase";
import Stepper, { Step } from "@/app/components/Stepper";

export default function Steps() {
    const [darkMode, setDarkMode] = useState(false);
    const [name, setName] = useState("");

    return (
    <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>        
        {/* DARK MODE TOGGLE */}
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
        >
            {darkMode ? <i class="fa-solid fa-sun fa-fade"></i> : <i class="fa-solid fa-moon fa-fade"></i>}
        </button>
        <section className="w-full text-white flex flex-col justify-between items-center">  
            <div className={`container transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
>
                <Stepper
                initialStep={1}
                onStepChange={(step) => {
                    console.log(step);
                }}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Previous"
                nextButtonText="Next"
                >
                <Step>
                    <h2 className="font-bold">Welcome to <i>CoreFocus</i>!</h2>
                    <p className="text-gray-500">Follow the profile setup to get started...</p>
                </Step>
                <Step>
                    <h2>Step 2</h2>
                    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
                    <p>Custom step content!</p>
                </Step>
                <Step>
                    <h2 className="font-bold">Enter your username</h2>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" className="mt-3 outline-none"/>
                </Step>
                <Step>
                    <h2>How about an input?</h2>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
                </Step>
                <Step>
                    <h2>How about an input?</h2>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
                </Step>
                <Step>
                    <h2>Final Step</h2>
                    <p>You made it!</p>
                </Step>
                </Stepper>
            </div>
        </section>
        </main>

 );
}
