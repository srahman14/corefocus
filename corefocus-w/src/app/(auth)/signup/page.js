"use client";

import MetaBalls from "@/app/components/MetaBalls";
import AnimatedContent from "@/app/components/AnimatedContent";
import { useState } from "react";
export default function SignUp() {
  const [email, setEmail] = useState("");

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

                 <form className="flex flex-col justify-center gap-4">
                    <label>
                    <input
                      className="p-2 rounded-xl bg-[#222] border-none w-full focus:bg-[#222]/70"
                      type="text"
                      value={email}
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <button className="bg-white p-2 rounded-xl text-sm text-black font-semibold hover:bg-gray-100/90 cursor-pointer">
                      <p>Sign up with email</p>
                    </button>
                 </form>

                 <div class="relative flex py-5 items-center">
                    <div class="flex-grow border-t border-white-400"></div>
                    <span class="flex-shrink mx-4 text-white-400 font-light">or continue with</span>
                    <div class="flex-grow border-t border-white-400"></div>
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
