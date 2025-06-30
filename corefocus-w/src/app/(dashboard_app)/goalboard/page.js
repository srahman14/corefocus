"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useThemeStore } from "@/app/store/useThemeStore";
import { useRouter } from "next/navigation";
import * as Checkbox from '@radix-ui/react-checkbox';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { isDark, toggleTheme } = useThemeStore()
    const [completed, setCompleted] = useState({});
    const habits = [
        { id: 'pray', label: 'Pray' },
        { id: 'quran', label: 'Read Qur’an' },
        { id: 'gym', label: 'Workout' },
        ]

    const toggleHabit = (id, checked) => {
        setCompleted((prev) => ({ ...prev, [id]: checked }))
    }


    useEffect(() => {
        console.log("Current dark mode:", isDark); // SHOULD show on load + toggle
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                // router.push("/");
                console.log("User not logged in")
            } 
            setLoading(false)
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }


   return (
        <main className="flex h-full min-h-screen flex-col bg-gray-100">
        {/* Topbar */}
            <div className="p-6 overflow-y-auto">
                <div className="flex md:flex-row gap-3 p-1">
                    <div className="flex flex-col md:flex-row gap-2 flex-1">
                        <div className="bg-white p-8 rounded-xl shadow min-h-[600px] w-full lg:col-span-4">
                            <header className="flex flex-row justify-between">
                                <h2 className="font-semibold text-3xl tracking-tighter">Habits for today</h2>
                                <span>
                                    <p className="text-lg font-semibold text-orange-400 inline-block mr-2">2 days</p>
                                    <i class="fa-sharp-duotone fa-solid fa-fire text-orange-400"></i>
                                </span>
                            </header>
                            <div className="bg-gray-200 min-h-1/2 rounded-lg mt-2 p-2">
                                <h2 className="font-semibold tracking-tighter text-xl">To be completed:</h2>
                                <div className="p-2">
                                    <div className="space-y-4">
                                    {habits.map((habit) => (
                                        <div key={habit.id} className="flex items-center gap-4">
                                        <Checkbox.Root
                                            checked={!!completed[habit.id]}
                                            onCheckedChange={(checked) => toggleHabit(habit.id, checked)}
                                            className="w-6 h-6 rounded-full bg-white border-2 border-black data-[state=checked]:bg-blue-600 flex items-center justify-center duration-300 ease-in-out cursor-pointer"
                                        >
                                            <Checkbox.Indicator>
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                            </Checkbox.Indicator>
                                        </Checkbox.Root>
                                        <label className="text-lg font-semibold">{habit.label}</label>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2>Done!</h2>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow min-h-[600px] w-full lg:col-span-4"><p>Habit editor</p></div>
                    </div>
                </div>

                <div className="flex md:flex-row p-1">
                    <div className="flex flex-1">
                        <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4">Heatmap</div>
                    </div>
                </div>
            </div>
        </main>
   )
};