"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className=" bg-gray-700  p-5">
      <div className="flex justify-between ">
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md">
          Home
        </Link>
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-red-600 text-white rounded-md"
            >
              Signout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
