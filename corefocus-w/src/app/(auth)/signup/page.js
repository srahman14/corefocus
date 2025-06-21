"use client";

import MetaBalls from "@/app/components/MetaBalls";
import AnimatedContent from "@/app/components/AnimatedContent";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (value) => {
    setEmail(value)

    if (!value) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }

  const validatePasswordStrength = (value) => {
    setPassword(value)
    
    if (value.includes(" ")) {
      setPasswordError("Password must not contain spaces");
    } else if (value.length < 8) {
      setPasswordError("Password requires 8 characters minimum");
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Password requires at least one capital letter");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPasswordError("Password requires at least 1 special character");
    } else {
      setPasswordError("")
    }
  }

  const validatePasswordsMatch = (value) => {
    setConfirmPassword(value)
    
    if (value !== Password) {
      setConfirmPasswordError("Passwords do not match!")
    } else {
      setConfirmPasswordError("")
    }
  }

  const SignUpWithEmail = async (e) => {
    e.preventDefault();
    if (EmailError || PasswordError || ConfirmPasswordError) {
      console.error("Credentials incomplete or invalid.");
      return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      Email,
      Password
    );

    const user = userCredential.user;
    console.log(user)
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("errorCode:", errorCode, "errorMessage:", errorMessage);
  };
}
  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full h-screen flex flex-row gap-20 justify-between items-center">  
        <div className="container h-screen bg-black text-white flex flex-col justify-center items-center">
          <AnimatedContent
            direction="horizontal"
            reverse={true}
            duration={0.8}
            ease="in"
            animateOpacity
            threshold={0.2}>
            <div className="flex flex-col">
                 <h1 className="text-center text-4xl font-bold mb-2">Create an account</h1>
                 <p className="mb-4">Enter your email below to create your account</p>

                 <form onSubmit={SignUpWithEmail} className="flex flex-col justify-center gap-2">
                    <input
                      className="p-2 rounded-xl bg-[#222] border-0 w-full focus:bg-[#222]/70"
                      type="text"
                      value={Email}
                      placeholder="name@example.com"
                      onChange={(e) => validateEmail(e.target.value)}
                      />
                      {EmailError && <p className="text-red-500 text-sm mt-1">{EmailError}</p>}
                      <input
                        className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70"
                        type="password"
                        value={Password}
                        placeholder="Password"
                        onChange={(e) => validatePasswordStrength(e.target.value)}
                        />
                        {PasswordError && <p className="text-red-500 text-sm mt-1">{PasswordError}</p>}
                    
                      <input
                        className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70 mb-2"
                        type="password"
                        value={ConfirmPassword}
                        placeholder="Confirm password"
                        onChange={(e) => validatePasswordsMatch(e.target.value)}
                        />
                        {ConfirmPasswordError && <p className="text-red-500 text-sm mt-1">{ConfirmPasswordError}</p>}
                    
                    <button
                      type="submit"
                      className="bg-white p-2 rounded-xl text-sm text-black font-semibold hover:bg-gray-100/90 cursor-pointer"
                      >                      
                      <p>Sign up with email</p>
                    </button>
                 </form>

                 <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-white-400"></div>
                    <span className="flex-shrink mx-4 text-white-400 font-light">or continue with</span>
                    <div className="flex-grow border-t border-white-400"></div>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="bg-[#101010] text-white p-2 rounded-xl text-lg text-black font-semibold hover:bg-[#101010]/80 cursor-pointer">
                    <span className="text-sm">
                      <i className="fa-brands fa-google mr-3 fa-fade"></i>
                      <p className="inline">Continue with Google</p>
                    </span>
                  </button>

                  <button className="bg-[#101010] text-white p-2 rounded-xl text-lg text-black font-semibold hover:bg-[#101010]/80 cursor-pointer">
                    <span className="text-sm">
                      <i className="fa-brands fa-github mr-3 fa-fade"></i>
                      <p className="inline">Continue with Github</p>
                    </span>
                  </button>

                  <button className="bg-[#101010] text-white p-2 rounded-xl text-lg text-black font-semibold hover:bg-[#101010]/80 cursor-pointer">
                    <span className="text-sm">
                      <i className="fa-brands fa-apple mr-3 fa-fade"></i>
                      <p className="inline">Continue with Apple</p>
                    </span>
                  </button>
                </div>

                <div className="flex justify-center items-center mt-12">
                  <p className="w-50 text-center text-gray-200 font-light">
                    By clicking continue, you agree to our <i className="hover:underline cursor-pointer">Terms of Service</i> and <i className="hover:underline cursor-pointer">Privacy Policy</i>.
                  </p>
                </div>
            </div>
            </AnimatedContent>
        </div>


        <div className="container flex justify-center items-center overflow-y-auto">
          <div style={{ height: '600px', position: 'relative' }}>
            <MetaBalls
            color="#000"
            cursorBallColor="#222"
            cursorBallSize={2}
            ballCount={15}
            animationSize={40}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.3}
            />
          </div>       
       </div>
      </section>
    </>
 );
}
