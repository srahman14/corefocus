"use client";

import MetaBalls from "@/app/components/MetaBalls";
import AnimatedContent from "@/app/components/AnimatedContent";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const { signUpWithEmail, authError, loading, currentUser, userData } =
    useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (!loading && currentUser && userData) {
      if (userData.completedSteps === false) {
        router.push("/steps");
      } else {
        router.push("/dashboard");
      }
    }
  }, [loading, currentUser, userData, router]);

  const validateEmail = (value) => {
    setEmail(value);

    if (!value) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePasswordStrength = (value) => {
    setPassword(value);

    if (value.includes(" ")) {
      setPasswordError("Password must not contain spaces");
    } else if (value.length < 8) {
      setPasswordError("Password requires 8 characters minimum");
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Password requires at least one capital letter");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPasswordError("Password requires at least 1 special character");
    } else {
      setPasswordError("");
    }
  };

  const validatePasswordsMatch = (value) => {
    setConfirmPassword(value);

    if (value !== Password) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Email || !Password || Password !== ConfirmPassword) {
      setFormError("❌ Invalid credentials");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(Email, Password);
      router.push("/steps");
    } catch (error) {
      console.error("Signup failed", error.message);
      setFormError("Sign up failed:" + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            threshold={0.2}
          >
            <div className="flex flex-col">
              <h1 className="text-center text-4xl font-bold mb-2">
                Create an account
              </h1>
              <p className="mb-4">
                Enter your email below to create your account
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center gap-2"
              >
                <input
                  className="p-2 rounded-xl bg-[#222] border-0 w-full focus:bg-[#222]/70"
                  type="text"
                  value={Email}
                  placeholder="name@example.com"
                  onChange={(e) => validateEmail(e.target.value)}
                />
                {EmailError && (
                  <p className="text-red-500 text-sm mt-1">{EmailError}</p>
                )}
                <input
                  className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70"
                  type="password"
                  value={Password}
                  placeholder="Password"
                  onChange={(e) => validatePasswordStrength(e.target.value)}
                />
                {PasswordError && (
                  <p className="text-red-500 text-sm mt-1">{PasswordError}</p>
                )}

                <input
                  className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70 mb-2"
                  type="password"
                  value={ConfirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => validatePasswordsMatch(e.target.value)}
                />
                {ConfirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {ConfirmPasswordError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white p-2 rounded-xl text-sm text-black font-semibold hover:bg-gray-100/90 cursor-pointer"
                >
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
                {(authError || formError) && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "10px",
                      transition: "ease-in-out",
                      animationDuration: "500ms",
                    }}
                  >
                    {authError || formError}
                  </p>
                )}
              </form>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-white-400"></div>
                <span className="flex-shrink mx-4 text-white-400 font-light">
                  or
                </span>
                <div className="flex-grow border-t border-white-400"></div>
              </div>

              {/* <div className="flex flex-col gap-2">
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
                </div> */}

              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="w-50 text-center text-gray-200 font-light">
                  By clicking continue, you agree to our{" "}
                  <i className="hover:underline cursor-pointer">
                    Terms of Service
                  </i>{" "}
                  and{" "}
                  <i className="hover:underline cursor-pointer">
                    Privacy Policy
                  </i>
                  .
                </p>

                <p className="w-50 text-center text-gray-200 font-light">
                  Already't have an account?
                  <Link href={"/login"} className="hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        <div className="container hidden md:flex justify-center items-center overflow-hidden">
          <div style={{ height: "600px", position: "relative" }}>
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
