"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 z-50 w-full bg-transparent shadow-md backdrop-blur transition-all duration-300"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-[5vw]">
        <Link href="/" className="display3 text-primary-500">
          MobileCer
        </Link>
        <div>
          {pathname === "/" ? (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center justify-center px-6 py-[6px] rounded-[16px] bg-primary-500 text-title3 text-white"
            >
              Login
            </button>
          ) : pathname.includes("/dashboard") ? (
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center px-6 py-[6px] rounded-[16px] bg-primary-500 text-title3 text-white"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center px-6 py-[6px] rounded-[16px] bg-primary-500 text-title3 text-white"
            >
              Home
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
