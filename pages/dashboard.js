import Message from "@/components/Message";
import { auth, db } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { PostsContext, UserContext } from "./_app";

const Dashboard = () => {
  const router = useRouter();
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [toggleReview, setToggleReview] = useState(true);
  const [clientPendingToggle, setClientPendingToggle] = useState(true);

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

  // Approve a post
  const approvePost = async (id) => {
    if (confirm("Are you sure you want to approve this post?")) {
      try {
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, { approved: true });
        toast.success("Post approved successfully.😊");
      } catch (err) {
        toast.error("Error when approving.🥴");
      }
    }
  };

  return (
    <div className="py-5">
      {toggleReview ? (
        <>
          <div>
            <h1 className="text-2xl font-medium mt-2 mb-1 text-gray-800/90">
              {posts.filter(
                (post) => post.authorUID === user?.uid && post.approved
              ).length === 0 &&
                clientPendingToggle &&
                "You don't have any posts yet."}
              {posts.filter(
                (post) => post.authorUID === user?.uid && post.approved
              ).length !== 0 &&
                clientPendingToggle &&
                "Post of yours"}
              {posts.filter(
                (post) => post.authorUID === user?.uid && post.approved
              ).length === 0 &&
                !clientPendingToggle &&
                `Pending post of yourself (${
                  posts.filter(
                    (post) => post.authorUID === user?.uid && !post.approved
                  ).length
                })`}
            </h1>
            <div className="my-4 mt-2">
              {posts
                .filter((post) => post.authorUID === user?.uid && post.approved)
                .map((post) => (
                  <>
                    {post.approved && clientPendingToggle && (
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
                    )}
                  </>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Post review for approved admin */}
          <div>
            <h1 className="text-2xl font-medium mt-2 mb-1 text-gray-800/90">
              {posts.filter((post) => !post.approved).length === 0
                ? "You don't have any posts for review yet."
                : "Pending post of others."}
            </h1>
            <div className="my-4 mt-2">
              {posts
                .filter((post) => !post.approved)
                .map((post) => (
                  <>
                    <div>
                      <Message key={post?.id} {...post}>
                        <div className="flex items-center gap-3">
                          <div
                            onClick={() => {
                              approvePost(post.id);
                            }}
                            className="flex items-center gap-1 font-bold text-green-500 cursor-pointer select-none"
                          >
                            <AiTwotoneDelete />
                            <span>Approve</span>
                          </div>
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
          </div>
        </>
      )}
      {/* Pending page for other's dashboard */}
      {user?.email !== "ohiduzzamansiam@gmail.com" && !clientPendingToggle && (
        <div>
          <h1 className="text-2xl font-medium mt-2 mb-1 text-gray-800/90"></h1>
          <div className="my-4 mt-2">
            {posts
              .filter((post) => post.authorUID === user?.uid)
              .map((post) => (
                <>
                  {!post.approved && (
                    <div>
                      <Message key={post?.id} {...post}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 font-bold text-blue-500 cursor-pointer select-none">
                            <AiTwotoneDelete />
                            <span>cancel</span>
                          </div>
                          <button
                            onClick={() => {
                              deletePost(post.id);
                            }}
                            className="flex items-center gap-1 font-bold text-red-600 cursor-pointer select-none"
                          >
                            <AiTwotoneDelete />
                            <span>cancel</span>
                          </button>
                        </div>
                      </Message>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      )}
      {/* Show review pending button */}
      {user?.email === "ohiduzzamansiam@gmail.com" ? (
        <button
          type="button"
          onClick={() => {
            if (posts.filter((post) => !post.approved).length !== 0) {
              setToggleReview(!toggleReview);
            }
          }}
          style={
            posts.filter((post) => !post.approved).length === 0
              ? { opacity: 0.6 }
              : { opacity: 1 }
          }
          className="inline-flex cursor-pointer items-center px-4 ml-2 py-2.5 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-500"
        >
          {toggleReview ? (
            <>
              Review to
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-400 bg-green-200 rounded-full">
                {posts.filter((post) => !post.approved).length}
              </span>
            </>
          ) : (
            <>
              <Link href="/">Back</Link>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (
              user?.email !== "ohiduzzamansiam@gmail.com" &&
              posts.filter(
                (post) => post.authorUID === user?.uid && !post.approved
              ).length !== 0
            ) {
              setClientPendingToggle(!clientPendingToggle);
            }
          }}
          class="inline-flex items-center px-3 ml-2 py-2.5 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-500"
        >
          Pending
          <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-400 bg-green-200 rounded-full">
            {
              posts
                .filter((post) => post.authorUID === user?.uid)
                .filter((post) => !post.approved).length
            }
          </span>
        </button>
      )}
      <button
        className="text-red-400 select-none ml-2 float-right bg-transparent focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => {
          if (confirm("Are you sure you want to log out?")) {
            signOut(auth)
              .then(() => {
                toast.success("Come back anytime.😊");
                setTimeout(() => {}, 500);
              })
              .catch((err) => {
                toast.error("Couldn't log out...");
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
