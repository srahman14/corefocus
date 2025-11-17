"use client";

import MetaBalls from "@/app/components/MetaBalls";
import AnimatedContent from "@/app/components/AnimatedContent";
import { useAuth } from "@/app/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [Password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const { loading, currentUser, signInWithEmail, userData, authError} = useAuth();
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EmailError || !Email || !Password) {
      setFormError("Please enure all fields are filled correctly")
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await signInWithEmail(Email, Password);
      console.log("Signed in:", user.uid);
    } catch (err) {
      console.error("Sign-in failed:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loading && currentUser && userData) {
      if (userData.completedSteps === false) {
        router.push("/steps")
      } else {
        router.push("/dashboard")
      }
    }
  }, [loading, currentUser, userData, router])

  if (currentUser && userData) {
    return null; 
  }

  if (loading) {
    return (
      <p className="flex items-center justify-center text-xl h-screen">Loading...</p>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full h-screen flex flex-row gap-20 justify-between items-center">
        <div className="container justify-center items-center overflow-y-auto hidden md:flex">
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
        <div className="container h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden">
            <AnimatedContent
                direction="horizontal"
                reverse={false}
                duration={0.8}
                ease="in"
                animateOpacity={0.3}
                threshold={0.2}>

            <div className="flex flex-col">
                 <h1 className="text-center text-4xl font-bold mb-2">Welcome back!</h1>
                 <p className="mb-4">Enter your email and password to login</p>

                 <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-2">
                      <input
                      className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70"
                      type="text"
                      value={Email}
                      placeholder="name@example.com"
                      onChange={(e) => validateEmail(e.target.value)}
                      />
                      {EmailError && <p className="text-red-500 text-sm mt-1">{EmailError}</p>}
                      <input
                      className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70 mb-2"
                      type="Password"
                      value={Password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      />
                    <button type="submit" disabled={loading} className="bg-white p-2 rounded-xl text-sm text-black font-semibold hover:bg-gray-100/90 cursor-pointer">
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    {(authError || formError) && (
                      <p style={{ color: 'red', marginTop: '10px', transition: "ease-in-out", animationDuration: "500ms" }}>
                        {authError || formError}
                      </p>
                    )}
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
                    Don't have an account? 
                    <Link href={"/signup"} className="hover:underline">Register here</Link>
                  </p>
                </div>
            </div>
            </AnimatedContent>
        </div>
      </section>
    </>
 );
}
