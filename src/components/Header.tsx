import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full bg-white/80 shadow-sm fixed top-0 left-0 z-20">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="font-semibold text-lg flex items-center gap-2">
          <span>Chat with Tinkerbell ✨</span>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <button className={`btn btn-sm rounded-full px-4 ${router.pathname === "/" ? "bg-pink-200 text-pink-800" : "bg-white text-gray-700 hover:bg-pink-100"}`}>Employee Chat</button>
          </Link>
          <Link href="/employee-tasks">
            <button className={`btn btn-sm rounded-full px-4 ${router.pathname === "/employee-tasks" ? "bg-pink-200 text-pink-800" : "bg-white text-gray-700 hover:bg-pink-100"}`}>Employee Tasks <span className="ml-1">📋</span></button>
          </Link>
        </div>
      </nav>
    </header>
  );
} 