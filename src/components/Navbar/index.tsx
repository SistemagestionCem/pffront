'use client'
import { useRouter } from "next/navigation"
import Link from 'next/link';

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-6">
      <Link href="/" className="display3 text-primary-500">MobileCer</Link>
      
      <div>
        <button
          onClick={() => router.push("/login")}
          className=" flex items-center justify-center gap-1.5 px-6 py-1.5 rounded-[16px] bg-primary-500 title3 text-white"
 
        >
          Login
        </button>
      </div>
    </div>
  );
}