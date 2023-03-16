import Message from "@/components/Message";
import { auth, db } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { PostsContext, UserContext } from "./_app";

const Dashboard = () => {
  const router = useRouter();
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router, posts]);

  // Delete a post
  const deletePost = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const docRef = doc(db, "posts", id);
      deleteDoc(docRef)
        .then(() => {
          toast.success("Post deleted successfully");
        })
        .catch((err) => {
          toast.error("Error deleting post");
        });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-medium mt-2 mb-1 text-gray-800/90">
        {posts.filter((post) => post.authorUID === user?.uid).length === 0
          ? "You don't have any posts yet"
          : "Post of yours."}
      </h1>
      <div className="my-4 mt-2">
        {posts
          .filter((post) => post.authorUID === user?.uid)
          .map((post) => (
            <>
              <div>
                <Message key={post?.id} {...post}>
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      className="flex items-center gap-1 font-bold text-red-600 cursor-pointer select-none"
                    >
                      <AiTwotoneDelete />
                      <span>delete</span>
                    </div>
                  </div>
                </Message>
              </div>
            </>
          ))}
      </div>
      <button
        className="text-white mt-4 bg-cyan-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => {
          if (confirm("Are you sure you want to log out?")) {
            signOut(auth)
              .then(() => {
                toast.success("Come back anytime.😊");
                setTimeout(() => {}, 500);
              })
              .catch((err) => {
                alert("Failed when logging out...");
                console.log(err.stack);
              });
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
