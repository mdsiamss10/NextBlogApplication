import { auth } from "@/firebase.config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../_app";

const Login = () => {
  // Sign in with google hanlde function
  const googleAuthProvider = new GoogleAuthProvider();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const handleGoogleSignin = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <>
      <div className="shadow-xl mt-32 md:mt-24 p-12 text-gray-600 rounded-md">
        <h2 className="text-2xl font-medium">Join Today!</h2>
        <div className="py-2">
          <h3 className="py-4">Sign in with one of the providers:</h3>
          <button
            onClick={handleGoogleSignin}
            className="text-white bg-gray-700 transition-all w-[100%] md:w-auto hover:bg-gray-700/90 gap-3 focus:ring-4 focus:outline-none focus:ring-gray-700/50 font-medium rounded-lg text-sm px-4 py-3 text-center flex items-center dark:focus:ring-gray-700/55"
          >
            <FcGoogle className="text-2xl" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
