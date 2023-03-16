/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { PostsContext, UserContext } from "./_app";

const Post = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router, posts]);

  // Form states with user details
  const [post, setPost] = useState({
    description: "",
    timeStamp: serverTimestamp(),
    authorUID: user?.uid,
    authorAvatar: user?.photoURL,
    authorName: user?.displayName,
  });
  //   Submit the form's post
  const submitPost = async (e) => {
    e.preventDefault();
    // Checks empty description
    if (!post.description) {
      toast.error("Post content is empty.💩");
      return;
    }
    if (post.description.length < 10) {
      toast.error("Post is too short.🥴");
      return;
    }
    if (post.description.length > 300) {
      toast.error("Post is more than 300 charecters.😁");
      return;
    }
    try {
      const collectionRef = collection(db, "posts");
      const result = await addDoc(collectionRef, post);
      if (result) {
        toast.success("Post created.😊");
      }
      setTimeout(() => {
        setPost({ ...post, description: "" });
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error("Post creation failed.🥴");
    }
  };

  return (
    <div className="shadow-xl my-10 md:my-0 p-8 pt-3 text-gray-800 rounded-md">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-medium mt-2 mb-1 text-gray-800/90">
          Create a new post:
        </h1>
        <div className="py-2">
          <label
            htmlFor="email"
            className="block mb-2 text-lg text-gray-800/90 pb-2 pt-1"
          >
            Description:
          </label>
          <textarea
            type="text"
            value={post.description}
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
            autoComplete="false"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-48"
          />
          <p
            className={`mt-2 text-green-500 ${
              post.description.length >= 300 && "text-red-500"
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="text-white mt-2 w-full bg-cyan-500/100 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
