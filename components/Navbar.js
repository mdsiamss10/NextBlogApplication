import { PostsContext, UserContext } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import SVGComponent from "./SVGComponent";

export default function Navbar() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const pathname = router.pathname;
  const { posts } = useContext(PostsContext);
  return (
    <>
      <nav className="flex items-center justify-between py-10">
        <Link href="/">
          <button className="text-lg text-gray-800">
            <SVGComponent />
          </button>
        </Link>
        <ul>
          {!user && pathname !== "/auth/login" && (
            <Link href={`auth/login/`}>
              <button
                type="button"
                className="text-white bg-[bg-[#55B3F3]] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Join Now
              </button>
            </Link>
          )}
          {pathname === "/auth/login" && (
            <Link href={`/`}>
              <button
                type="button"
                className="text-white bg-[bg-[#55B3F3]] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                    className="text-white bg-[#55B3F3] focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Post
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button
                    type="button"
                    class="relative inline-flex items-center text-sm font-medium text-center text-white"
                  >
                    <Image
                      src={`${user?.photoURL}`}
                      alt="User Profile Image"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <span className="sr-only">Notifications</span>
                    {user.email === "ohiduzzamansiam@gmail.com" &&
                      posts.filter((post) => !post.approved).length !== 0 && (
                        <>
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                            {posts.filter((post) => !post.approved).length !==
                              0 &&
                              posts.filter((post) => !post.approved).length}
                          </div>
                        </>
                      )}
                  </button>
                </Link>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
