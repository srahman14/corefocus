import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-wrap items-center justify-center">
      {/* HERO SECTION */}
      <section className="w-full h-screen bg-[url('/landing_page_2.svg')] bg-no-repeat bg-cover bg-center flex items-center justify-center text-center flex-row gap-30">
          <h1 className="font-bold text-9xl">Build habits today <br></br> Achieve your goals</h1>
      </section>
    </main>
  );
}
