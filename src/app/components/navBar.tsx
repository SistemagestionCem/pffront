'use client'
import { useRouter } from "next/navigation"

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-6">
      <div onClick={()=>router.push("/")} className="text-2xl font-bold text-red-500">
        <p>MobileFix</p>
      </div>
      <div>
        <button
          onClick={() => router.push("/login")}
          className="bg-red-500 px-4 py-2 rounded-xl text-white font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}