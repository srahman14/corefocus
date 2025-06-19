"use client";

import MetaBalls from "@/app/components/MetaBalls";
export default function SignUp() {

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full h-screen flex flex-row gap-20 justify-between items-center">  
        <div className="container  h-screen bg-black text-white flex flex-col justify-center items-center">
            <div className="flex flex-col">
                 <h1>Create an account</h1>
                <p>Enter your email below to create your account</p>


            </div>
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
