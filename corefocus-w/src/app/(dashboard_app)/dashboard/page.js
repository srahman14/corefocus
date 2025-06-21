"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                router.push("/");
            } 
            setLoading(false)
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <main className="min-h-screen bg-white text-black flex flex-col flex-wrap items-center justify-center">
        {/* HERO SECTION */}
        <section className="w-full h-220 flex flex-col justify-center items-center mb-32 mt-70 p-16">  
            <h2>CONTENT</h2>
            <button onClick={() => signOut(auth)}>Logout</button>
        </section>
        </main>

 );
}
