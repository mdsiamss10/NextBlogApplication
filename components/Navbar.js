import { UserContext } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const pathname = router.pathname;
  return (
    <>
      <nav className="flex items-center justify-between py-10">
        <Link href="/">
          <button className="text-lg text-gray-800">Creative thoughts</button>
        </Link>
        <ul>
          {pathname !== "/auth/login" && (
            <Link href={`auth/login/`}>
              <button
                type="button"
                className="text-white bg-cyan-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Join Now
              </button>
            </Link>
          )}
          {pathname === "/auth/login" && (
            <Link href={`/`}>
              <button
                type="button"
                className="text-white bg-cyan-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Home
              </button>
            </Link>
          )}
          {user && (
            <>
              <div className="flex items-center gap-5 md:gap-6">
                <Link href="/post">
                  <button
                    type="button"
                    className="text-white bg-cyan-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Post
                  </button>
                </Link>
                <Link href="/dashboard">
                  <Image
                    src={`${user.photoURL}`}
                    alt="User Profile Image"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                </Link>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
